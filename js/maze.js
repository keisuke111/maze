// // 深さ優先探索
// const dfs = (ary, y, x, flg) => {
//     if (flg) {
//         // 既にゴールしているため探索しない
//     } else {
//         let count = 0;  // 未探索分岐の数
//
//         if (ary[y - 1][x] == 0 || ary[y - 1][x] == 3) {
//             count++;
//         }
//         if (ary[y + 1][x] == 0 || ary[y + 1][x] == 3) {
//             count++;
//         }
//         if (ary[y][x - 1] == 0 || ary[y][x - 1] == 3) {
//             count++;
//         }
//         if (ary[y][x + 1] == 0 || ary[y][x + 1] == 3) {
//             count++;
//         }
//
//     }
//
//     if (ary[y][x] == 3) {
//         ary[y][x] = 4;  // 現在地を探索済に変更
//     } else {
//         mAry[y][x] = 4;  // 現在地を探索済に変更
//
//         if (flg == 0) {
//             ansStack.push(y + " " + x);
//
//             if (mAry[y - 1][x] == 0 || mAry[y - 1][x] == 3) {
//                 dfs(mAry, y - 1, x);
//                 count--;
//             }
//             if (mAry[y + 1][x] == 0 || mAry[y + 1][x] == 3) {
//                 dfs(mAry, y + 1, x);
//                 count--;
//             }
//             if (mAry[y][x - 1] == 0 || mAry[y][x - 1] == 3) {
//                 dfs(mAry, y, x - 1);
//                 count--;
//             }
//             if (mAry[y][x + 1] == 0 || mAry[y][x + 1] == 3) {
//                 dfs(mAry, y, x + 1);
//                 count--;
//             }
//             if (count == 0) {
//                 ansStack.pop();
//             }
//         }
//     }
// }

// 棒があるか確認
const isExistsWall = (ary, y, x) => {
    if (ary[y][x] == 1) {
        return false;
    } else {
        return true;
    }
}

// 表示
const printMaze = (ary) => {
    for (let i = 0; i < ary.length; i++) {
        for (let j = 0; j < ary[i].length; j++) {
            switch (ary[i][j]) {
                case 0:
                    document.write("　");
                    break;
                case 1:
                    document.write("𪚥");
                    break;
                case 2:
                    document.write("◎");
                    break;
                case 3:
                    document.write("●");
                    break;
            }
        }
        document.write("<br>");
    }
}

// 迷路作成
const createMaze = () => {

    const SIZE = 15;

    let mazeAry = new Array(SIZE);
    for (let i = 0; i < mazeAry.length; i++) {
        mazeAry[i] = new Array(SIZE);
    }

    // 初期状態の作成
    // 1:壁
    // 0:道
    // 2:スタート
    // 3:ゴール
    for (let i = 0; i < mazeAry.length; i++) {
        for (let j = 0; j < mazeAry[i].length; j++) {
            if (i == 0 || i == SIZE - 1 || j == 0 || j == SIZE - 1 ) {
                mazeAry[i][j] = 1;     // 外壁
            } else if (i % 2 == 0 && j % 2 == 0) {
                mazeAry[i][j] = 1;      // 内壁
            } else if (i == 1 && j == 1) {
                mazeAry[i][j] = 2;    // スタート
            } else if (i == SIZE - 2 && j == SIZE - 2) {
                mazeAry[i][j] = 3;    // ゴール
            } else {
                mazeAry[i][j] = 0;      // 道
            }
        }
    }

    // 棒伸ばし処理
    for (let i = 2; i < SIZE - 2; i += 2) {
        for (let j = 2; j < SIZE - 2; j += 2) {

            let rm;

            if(i == 2) {    // 1行目の内壁
                rm = Math.floor(Math.random() * 4);
            } else {        // それ以降の内壁
                rm = Math.floor(Math.random() * 3) + 1;
            }

            switch (rm) {
                case 0: // 上
                    mazeAry[i - 1][j] = 1;
                    break;
                case 1: // 下
                    if (isExistsWall(mazeAry, i + 1, j)) {
                        mazeAry[i + 1][j] = 1;
                    } else {
                        j -= 2;
                    }
                    break;
                case 2: // 右
                    if (isExistsWall(mazeAry, i, j + 1)) {
                        mazeAry[i][j + 1] = 1;
                    } else {
                        j -= 2;
                    }
                    break;
                case 3: // 左
                    if (isExistsWall(mazeAry, i, j - 1)) {
                        mazeAry[i][j - 1] = 1;
                    } else {
                        j -= 2;
                    }
                    break;
            }
        }
    }

    return mazeAry;
}

// window.onload = () => {
    let map = createMaze();
    printMaze(map);

    let ansFlg = false;
// }
