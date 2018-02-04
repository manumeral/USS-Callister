"use strict";

import GAME_CONST from "../../../const/GAME_CONST";

export default class Shoot extends Phaser.Sprite {
    constructor(arg) {
        super(arg.game, arg.posX, arg.posY, arg.label);
        this.anchor.setTo(0.5);
        this.frame = 0;
        arg.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.angle = arg.angle + 180;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.velocity.x = GAME_CONST.SPEED.SHOOT*Math.cos(this.rotation);
        this.body.velocity.y = GAME_CONST.SPEED.SHOOT*Math.sin(this.rotation);
    }
}