"use strict";

export default class Planet extends Phaser.Sprite{
    constructor(arg) {
        super(arg.game, arg.posX, arg.posY, arg.label);
        this.anchor.setTo(arg.anchorX, arg.anchorY);
        this.scale.setTo(0.35,0.35);
        arg.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
    }
};