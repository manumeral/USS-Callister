"use strict";

export default class Universe extends Phaser.Image{
    constructor(arg) {
        super(arg.game, arg.posX, arg.posY, arg.label);
        this.anchor.setTo(arg.anchorX, arg.anchorY);
    }
};