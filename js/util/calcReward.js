// 報酬を計算
const calcReward = (act, obj, ary, hwp, gp) => {
    let r = 0;

    obj.nextX = obj.x;
    obj.nextY = obj.y;

    // 壁があったら移動しない
      act == 0 ?
        ary[obj.x][obj.y - 1] == 0 ? obj.nextY-- : r += hwp
    : act == 1 ?
        ary[obj.x][obj.y + 1] == 0 ? obj.nextY++ : r += hwp
    : act == 2 ?
        ary[obj.x - 1][obj.y] == 0 ? obj.nextX-- : r += hwp
    : act == 3 ?
        ary[obj.x + 1][obj.y] == 0 ? obj.nextX++ : r += hwp
    : undefined

    if (obj.nextX == ary.length - 2 && obj.nextY == ary.length - 2) {
        r += gp;
    }

    return r;
}
