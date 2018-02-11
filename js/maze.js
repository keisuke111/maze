const MAZE_ARRAY = createMaze(MAZE_SIZE)

let minStep = Number.MAX_VALUE
let minRoute

// Q値の初期化
let qAry = createQ(MAZE_SIZE, Q_MAX)

for (let i = 0; i < MAX_LEANING; i++) {
    // エージェントの初期化
    let agent = {
        x: 1,
        y: 1,
        nextX: 1,
        nextY: 1,
        step: 0,
        route: []
    }

    let isGoal = false;

    while (!isGoal) {
        agent.step++;

        let action = eGreedy(qAry, agent, EPSILON)
        let reward = calcReward(action, agent, MAZE_ARRAY, HIT_WALL_POINT, GOAL_POINT)
        reward += STEP_POINT
        agent.route.push([agent.nextX, agent.nextY])
        updateQ(action, reward, qAry, agent, ALPHA, GAMMA)

        // 現在地の更新
        agent.x = agent.nextX
        agent.y = agent.nextY

        // ゴール判定
        if (agent.x == MAZE_SIZE - 2 && agent.y == MAZE_SIZE - 2) {
            isGoal = true
        }
    }

    if (agent.step < minStep) {
        minStep = agent.step
        minRoute = agent.route
    }
    console.log("learn:" + i + ", stop:" + agent.step + ", min:" + minStep)
}

console.log(minRoute)
shortestRoute(minRoute, 0, MAZE_ARRAY)
