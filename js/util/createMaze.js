// 迷路生成
const createMaze = (size) => {
    const ary = (
        [...Array(size)].map(x => [...Array(size)].map(x => 0))
    )
        .map((x, i) =>
            x.map((y, j) =>
                i == 0 || i == size - 1 || j == 0 || j == size - 1 ? 1 // 外壁
              : i % 2 == 0 && j % 2 == 0                           ? 1 // 内壁
              :                                                      0 // 道
          )
        )

    // 棒伸ばし処理
    for (let i = 2; i < size - 2; i += 2) {
        for (let j = 2; j < size - 2; j += 2) {

          const rn = Math.floor(Math.random() * 4)

          rn == 0 ? (ary[i - 1][j] = 1)     // 上
        : rn == 1 ? (ary[i + 1][j] = 1)     // 下
        : rn == 2 ? (ary[i][j - 1] = 1)     // 左
        : rn == 3 ? (ary[i][j + 1] = 1)     // 右
        : undefined
        }
    }

    return ary
}
