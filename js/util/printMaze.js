// 表示
const printMaze = ary => {

    while (document.body.firstChild)
    document.body.removeChild(document.body.firstChild)

    let section = document.createElement("section")
    section.id = "maze"

    document.body.appendChild(section)

    ary.map(x => {
        let row = document.createElement("div")
        row.id = "maze-row"

        x.map(y => {
            let part = document.createElement("div")
            part.id = "maze-part"

            part.innerText = (
                y == 0 ? ""
              : y == 1 ? "□"
              : y == 2 ? "●"
              :          undefined
            )

            row.appendChild(part)
        })

        section.appendChild(row)
    })
}
