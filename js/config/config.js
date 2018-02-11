const EPSILON = 0.30;       // ε-greedy法：ε
const ALPHA = 0.10;         // 学習率：α
const GAMMA = 0.90;         // 割引率：γ
const Q_MAX = 30;           // Qの初期値の最大値

const STEP_POINT = -1;      // 1ステップ経過のポイント
const GOAL_POINT = 100;     // ゴールのポイント
const HIT_WALL_POINT = -5;  // 壁に当たった時のポイント

const MAX_LEANING = 10000;  // 最大学習回数
const MAZE_SIZE = 11;       // 迷路のサイズ(1辺)
