
"use strict";

import GAME_CONST from "../const/GAME_CONST";
import PhaserGame from "../PhaserGame";

let GameManager = {
    createGame() {
        this.game = new PhaserGame(GAME_CONST.CANVAS.WIDTH, GAME_CONST.CANVAS.HEIGHT, GAME_CONST.CANVAS.CONTAINER);
    },
    startGame() {
        this.game.state.start(GAME_CONST.STATES.BOOT);
    },
    startState(state) {
        this.game.state.start(state);
    }
};

export default GameManager;