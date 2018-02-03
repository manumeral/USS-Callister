'use strict';

import Universe from "../objects/widgets/images/Universe";
import Planet from "../objects/widgets/images/Planet";

export class Play extends Phaser.State {
    preload() {
        console.log("Preloading Play State");
    }

    create() {
        this._createPlanet();

    }

    shutdown() {
        for (let i = this.game.stage.children.length - 1; i >= 0; i--) {
            if(! this.game.stage.children[i] instanceof Universe) {
                this.game.stage.removeChild(this.game.stage.children[i]);
            }
        }
    }

    _createPlanet() {
        this.planet = new Planet({
            game: this.game,
            posX: this.world.centerX,
            posY: this.world.centerY,
            label: 'planet',
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.game.stage.addChild(this.planet);
    }


}