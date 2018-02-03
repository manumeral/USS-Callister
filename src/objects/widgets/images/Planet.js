"use strict";

export default class Planet extends Phaser.Image{
    constructor(arg) {
        super(arg.game, arg.posX, arg.posY, arg.label);
        this.anchor.setTo(arg.anchorX, arg.anchorY);
        this.scale.setTo(0.35,0.35);
    }
};