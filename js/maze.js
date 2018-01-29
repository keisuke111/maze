// 壁があるか確認
const isExistsWall = (ary, y, x) => ary[y][x] == 1 ? false : true

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
              : y == 2 ? "◎"
              : y == 3 ? "●"
              :          undefined
            )

            row.appendChild(part)
        })

        section.appendChild(row);
    })
}

// 迷路作成
const createMaze = size => {

    // 初期状態の作成
    // 1:壁
    // 0:道
    // 2:スタート
    // 3:ゴール

    let mazeAry = (
        [...Array(size)].map(x => [...Array(size)].map(x => 0))
    )
        .map((x, i) =>
            x.map((y, j) =>
                i == 0 || i == size - 1 || j == 0 || j == size - 1 ? 1 // 外壁
              : i % 2 == 0 && j % 2 == 0                           ? 1 // 内壁
              : i == 1 && j == 1                                   ? 2 // スタート
              : i == size - 2 && j == size - 2                     ? 3 // ゴール
              :                                                      0 // 道
          )
        )


    // 棒伸ばし処理
    for (let i = 2; i < size - 2; i += 2) {
        for (let j = 2; j < size - 2; j += 2) {

          const rm = Math.floor(Math.random() * 4)

          rm == 0 ? (mazeAry[i - 1][j] = 1)     // 上
        : rm == 1 ? (mazeAry[i + 1][j] = 1)     // 下
        : rm == 2 ? (mazeAry[i][j - 1] = 1)     // 左
        : rm == 3 ? (mazeAry[i][j + 1] = 1)     // 右
        : undefined
        }
    }

    return mazeAry;
}

window.onload = _ => {
    const SIZE = 13;

    let map = createMaze(SIZE);   // 5以上の奇数
    printMaze(map);
    console.log(map);
}
