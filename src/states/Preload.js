'use strict';

import Universe from "../objects/widgets/images/Universe";

export class Preload extends Phaser.State {
    preload() {
        console.log("Preloading Preload State");
        this._createBackground();
    }

    create() {
    }

    update() {
    }

    shutdown() {
    }

    _createBackground() {
        console.log("Creating Background");
        this.universe = new Universe({
            game: this.game,
            posX: 0,
            posY: 0,
            label: 'universe',
            anchorX: 0,
            anchorY: 0
        });
        this.game.stage.addChild(this.universe);
    }
}