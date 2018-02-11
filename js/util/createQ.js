// Q値の初期化
const createQ = (size, a) => {
    let q = [...Array(size)].map(x => [...Array(size)].map(x => [...Array(4)].map(x => 0)))
    q.map(_ =>
        _.map(_ =>
            _.map(_ =>
                Math.floor(Math.random() * a) + 1
            )
        )
    )

    return q
}
