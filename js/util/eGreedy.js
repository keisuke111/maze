// ε-greedy法
const eGreedy = (ary, obj) => {
    const rn = Math.floor(Math.random() * 100) + 1;
    let a = 0;

    if (rn >= a * 100) {
        // 確率(1 - ε)のためQ値最大を選択
        for (let i = 0; i < 4; i++) {
            if (ary[obj.x][obj.y][a] < ary[obj.x][obj.y][i]) {
                a = i;
            }
        }
    } else {
        // 確率εのためランダムに選択
        a = Math.floor(Math.random() * 4);
    }

    return a;
}
