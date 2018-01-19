// 棒があるか確認
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
              :          "これが表示されたら自殺する"
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
        [...Array(15)].map(x => [...Array(15)].map(x => 0))
    )
        .map((x, i) => 
            x.map((y, j)=> 
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

            const rm = i == 2 ? Math.floor(Math.random() * 4) 
                     :          Math.floor(Math.random() * 3) + 1

            rm == 0 ? (mazeAry[i - 1][j] = 1)
          : rm == 1 ? 
              isExistsWall(mazeAry, i + 1, j) ? (mazeAry[i + 1][j] = 1)
            :                                   (j -= 2)
          : rm == 2 ? 
              isExistsWall(mazeAry, i, j + 1) ? (mazeAry[i][j + 1] = 1)
            :                                   (j -= 2)
          : rm == 3 ?
              isExistsWall(mazeAry, i, j - 1) ? (mazeAry[i][j - 1] = 1)
            :                                   (j -= 2)
          :                                     undefined

        }
    }

    return mazeAry;
}

window.onload = _ => {
    let map = createMaze(15);
    printMaze(map);
    let ansFlg = false;
}
