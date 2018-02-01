// 表示
const printMaze = ary => {

    let section = document.createElement("section");
    section.id = "maze"

    document.body.appendChild(section)

    ary.map(x => {
        let row = document.createElement("div");
        row.id = "maze-row"

        x.map(y => {
            let part = document.createElement("div");
            part.id = "maze-part"

            part.innerText = (
                y == 0 ? ""
              : y == 1 ? "𪚥"
              :          undefined
            )

            row.appendChild(part)
        })

        section.appendChild(row);
    })
}

const EPSILON = 0.30;       // ε-greedy法：ε
const ALPHA = 0.10;         // 学習率：α
const GAMMA = 0.90;         // 割引率：γ
const Q_MAX = 30;           // Qの初期値の最大値

const GOAL_POINT = 100;     // ゴールのポイント
const HIT_WALL_POINT = -5;  // 壁に当たった時のポイント
const STEP_POINT = -1;      // 1ステッ プ経過のポイント

const MAX_LEANING = 100;    // 最大学習回数
const MAZE_SIZE = 13;       // 迷路のサイズ(1辺)

// 迷路生成(ランダム)
// const MAZE_ARRAY = (
//     [...Array(MAZE_SIZE)].map(x => [...Array(MAZE_SIZE)].map(x => 0))
// )
//     .map((x, i) =>
//         x.map((y, j) =>
//             i == 0 || i == MAZE_SIZE - 1 || j == 0 || j == MAZE_SIZE - 1 ? 1 // 外壁
//           : i % 2 == 0 && j % 2 == 0                                     ? 1 // 内壁
//           :                                                                0 // 道
//       )
//     )
//
//
// // 棒伸ばし処理
// for (let i = 2; i < MAZE_SIZE - 2; i += 2) {
//     for (let j = 2; j < MAZE_SIZE - 2; j += 2) {
//
//       const rm = Math.floor(Math.random() * 4)
//
//       rm == 0 ? (MAZE_ARRAY[i - 1][j] = 1)     // 上
//     : rm == 1 ? (MAZE_ARRAY[i + 1][j] = 1)     // 下
//     : rm == 2 ? (MAZE_ARRAY[i][j - 1] = 1)     // 左
//     : rm == 3 ? (MAZE_ARRAY[i][j + 1] = 1)     // 右
//     : undefined
//     }
// }

// 迷路作成(最短20)
const MAZE_ARRAY = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

printMaze(MAZE_ARRAY);

let minStep = Number.MAX_VALUE;
let minStepRoute = "";

let x, y, nextX, nextY;

// Q値の初期化
let qAry = (
    [...Array(MAZE_SIZE)].map(x => [...Array(MAZE_SIZE)].map(x => [...Array(4)].map(x => 0)))
).map((x, i) =>
    x.map((y, j) =>
        y.map((a, k) =>
            Math.floor(Math.random() * Q_MAX) + 1
        )
    )
)

// ε-greedy法
const eGreedy = _ => {
    const rm = Math.floor(Math.random() * 100) + 1;
    let a = 0;

    if (rm >= EPSILON * 100) {
        // 確率(1 - ε)のためQ値最大を選択
        for (let i = 0; i < 4; i++) {
            if (qAry[x][y][a] < qAry[x][y][i]) {
                a = i;
            }
        }
    } else {
        // 確率εのためランダムに選択
        a = Math.floor(Math.random() * 4);
    }

    return a;
}

// 報酬を返す
const action = (a) => {
    let r = 0;

    nextX = x;
    nextY = y;

    // 壁があったら移動しない
      a == 0 ?
        MAZE_ARRAY[x][y - 1] == 0 ? nextY-- : r += HIT_WALL_POINT
    : a == 1 ?
        MAZE_ARRAY[x][y + 1] == 0 ? nextY++ : r += HIT_WALL_POINT
    : a == 2 ?
        MAZE_ARRAY[x - 1][y] == 0 ? nextX-- : r += HIT_WALL_POINT
    : a == 3 ?
        MAZE_ARRAY[x + 1][y] == 0 ? nextX++ : r += HIT_WALL_POINT
    : undefined

    if (nextX == MAZE_SIZE - 2 && nextY == MAZE_SIZE - 2) {
        r += GOAL_POINT;
    }

    return r;
}

// Q値を更新
const updateQ = (r, a) => {
    let maxA = 0;
    for (let i = 0; i < 4; i++) {
        if (qAry[nextX][nextY][maxA] < qAry[nextX][nextY][i]) {
            maxA = i;
        }
    }

    // Qst,at=Qst,at+α(r+γ・max・Qst+1,at+1−Qst,at)
    qAry[x][y][a] = qAry[x][y][a] + ALPHA * (r + GAMMA * qAry[nextX][nextY][maxA] - qAry[x][y][a]);
}


for (let i = 0; i < MAX_LEANING; i++) {
    // エージェントの初期化
    x = 1;
    y = 1;
    nextX = 1;
    nextY = 1;
    let step = 0;   // ステップ数
    let stepRoute = "";

    let isGoal = false;
    while (!isGoal) {
        step++;

        let a = eGreedy();
        let r = action(a);
        r += STEP_POINT;
        stepRoute += "[" + nextY  + ", " + nextX + "] ";
        updateQ(r, a);

        x = nextX;
        y = nextY;

        // ゴール判定
        if (x == MAZE_SIZE - 2 && y == MAZE_SIZE - 2) {
            isGoal = true;
        }
    }

    if (step < minStep) {
        minStep = step;
        minStepRoute = stepRoute;
    }
    console.log("learn:" + i + ", stop:" + step + ", min:" + minStep);
}

console.log(minStepRoute);
