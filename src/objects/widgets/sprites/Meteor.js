"use strict";

export default class Meteor extends Phaser.Sprite {
    constructor(arg) {
        super(arg.game, arg.posX, arg.posY, arg.label);
        this.scale.setTo(0.2);
        this.anchor.setTo(0.5);
        this.frame = 0;
        arg.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.checkWorldBounds = true;
        console.log(this);
    }
}