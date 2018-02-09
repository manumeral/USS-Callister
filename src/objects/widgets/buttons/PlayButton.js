"use strict";

import GAME_CONST from "../../../const/GAME_CONST";
import GameManager from "../../../controller/GameManager";

export default class PlayButton extends Phaser.Button {
    constructor(arg) {
        let backButtonClickHandler = function () {
            this.callback && this.callback();
            GameManager.startState(GAME_CONST.STATES.PLAY);
        };
        super(arg.game, arg.posX, arg.posY, arg.label, backButtonClickHandler, null, arg.overFrame || 0, arg.outFrame|| 0, arg.downFrame || 0, arg.upFrame || 0);
        this.anchor.setTo(arg.anchorX, arg.anchorY);
        this.callback = arg.callback;
    }
};