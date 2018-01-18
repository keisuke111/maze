// 表示
const printMap = () => {
    for (let i = 0; i < mapAry.length; i++) {
        for (let j = 0; j < mapAry[i].length; j++) {
            switch (mapAry[i][j]) {
                case -1:
                    document.write("𪚥");
                    break;
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
                case 4:
                    document.write("■");
                    break;
                case 5:
                    document.write("　");
                    break;
            }
        }
        document.write("<br>");
    }
    document.write("<br>");
}

// 壁があるかのチェック関数
const isCheck = (ary, y, x) => {
    if (ary[y][x] == 1) {
        return false;
    } else {
        return true;
    }
}

// 道の数
const rootCount = (ary, y, x) => {
    let count = 0;
    if (ary[y - 1][x] == 0 || ary[y - 1][x] == 3) {
        count++;
    }
    if (ary[y + 1][x] == 0 || ary[y + 1][x] == 3) {
        count++;
    }
    if (ary[y][x - 1] == 0 || ary[y][x - 1] == 3) {
        count++;
    }
    if (ary[y][x + 1] == 0 || ary[y][x + 1] == 3) {
        count++;
    }

    return count;
}

// 深さ優先探索
const dfs = (mAry, y, x) => {
    let count = rootCount(mAry, y, x);  // 未探索分岐の数
    if (mAry[y][x] == 3) {
        mAry[y][x] = 4;  // 現在地を探索済に変更

        console.log("GOAL");
        printMap();
    } else {
        mAry[y][x] = 4;  // 現在地を探索済に変更

        if (mAry[y - 1][x] == 0 || mAry[y - 1][x] == 3) {
            dfs(mAry, y - 1, x);
            count--;
        }
        if (mAry[y + 1][x] == 0 || mAry[y + 1][x] == 3) {
            dfs(mAry, y + 1, x);
            count--;
        }
        if (mAry[y][x - 1] == 0 || mAry[y][x - 1] == 3) {
            dfs(mAry, y, x - 1);
            count--;
        }
        if (mAry[y][x + 1] == 0 || mAry[y][x + 1] == 3) {
            dfs(mAry, y, x + 1);
            count--;
        }
        if (count == 0) {
            mAry[y][x] = 5;
        }
    }
}

const SIZE = 15;    // 5以上の奇数を指定(5~133)

// 二次元配列の宣言
let mapAry = new Array(SIZE);
for (let i = 0; i < mapAry.length; i++) {
    mapAry[i] = new Array(SIZE);
}

// 二次元配列に値をセット(初期配置)
// -1:外壁
// 1:内壁
// 0:道
// 2:スタート
// 3:ゴール
// 4:正解
// 5:不正解
for (let i = 0; i < mapAry.length; i++) {
    for (let j = 0; j < mapAry[i].length; j++) {
        if (i == 0 || i == SIZE - 1 || j == 0 || j == SIZE - 1 ) {
            mapAry[i][j] = -1;
        } else if (i % 2 == 0 && j % 2 == 0) {
            mapAry[i][j] = 1;
        } else if (i == 1 && j == 1) {
            mapAry[i][j] = 2;
        } else if (i == SIZE - 2 && j == SIZE - 2) {
            mapAry[i][j] = 3;
        } else {
            mapAry[i][j] = 0;
        }
    }
}

printMap();

// 棒伸ばし
const create = () => {

}
for (let i = 0; i < mapAry.length; i++) {
    for (let j = 0; j < mapAry[i].length; j++) {
        // 内壁
        if (i % 2 == 0 && j % 2 == 0 && mapAry[i][j] != -1) {
            let rm;
            if(i == 2) {    // 1行目の内壁
                rm = Math.floor(Math.random() * 4);
            } else {        // それ以降の内壁
                rm = Math.floor(Math.random() * 3) + 1;
            }
            switch (rm) {
                case 0: // 上
                    if (isCheck(mapAry, i - 1, j)) {
                        mapAry[i - 1][j] = 1;
                    } else {
                        j--;
                    }
                    break;
                case 1: // 下
                    if (isCheck(mapAry, i + 1, j)) {
                        mapAry[i + 1][j] = 1;
                    } else {
                        j--;
                    }
                    break;
                case 2: // 右
                    if (isCheck(mapAry, i, j + 1)) {
                        mapAry[i][j + 1] = 1;
                    } else {
                        j--;
                    }
                    break;
                case 3: // 左
                    if (isCheck(mapAry, i, j - 1)) {
                        mapAry[i][j - 1] = 1;
                    } else {
                        j--;
                    }
                    break;
            }
        }
    }
}

printMap();

// 探索スタート
dfs(mapAry, 1, 1);
