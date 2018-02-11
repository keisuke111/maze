// Q値を更新
const updateQ = (a, r, ary, obj, alpha, gamma) => {
    let maxA = 0;
    for (let i = 0; i < 4; i++) {
        if (ary[obj.nextX][obj.nextY][maxA] < ary[obj.nextX][obj.nextY][i]) {
            maxA = i;
        }
    }

    // Qst,at=Qst,at+α(r+γ・max・Qst+1,at+1−Qst,at)
    ary[obj.x][obj.y][a] = ary[obj.x][obj.y][a] + alpha * (r + gamma * ary[obj.nextX][obj.nextY][maxA] - ary[obj.x][obj.y][a]);
}
