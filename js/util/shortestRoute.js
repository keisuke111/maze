const shortestRoute = (x, i, ary) => {
    let m = Array.from(ary)
    m[x[i][0]][x[i][1]] = 2;
    printMaze(m)
    x[i + 1] && setTimeout(_ => shortestRoute(x, i + 1, m) , 500)
}
