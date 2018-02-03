"use strict";

import GAME_CONST from "./const/GAME_CONST";
import {Boot} from "./states/Boot";
import {Preload} from "./states/Preload";

export default class PhaserGame extends Phaser.Game {
    constructor(width, height, container) {
        super(width, height, Phaser.CANVAS, container);
        this.state.add(GAME_CONST.STATES.BOOT, Boot);
        this.state.add(GAME_CONST.STATES.PRELOAD, Preload)

    }
}