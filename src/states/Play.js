'use strict';

import Universe from "../objects/widgets/images/Universe";
import Planet from "../objects/widgets/images/Planet";
import SpaceShip from "../objects/widgets/images/SpaceShip";

export class Play extends Phaser.State {
    preload() {
        console.log("Preloading Play State");
        this.spaceShipThrust = 0.08;
    }

    create() {
        this._createHealth();
        this._createPlanet();
        this._createSpaceShip();
        this.game.input.onTap.add(this._changeShipDirection, this);
    }

    update() {
        this.spaceShip.rotation += this.spaceShipThrust;
    }

    shutdown() {
        for (let i = this.game.stage.children.length - 1; i >= 0; i--) {
            if (!this.game.stage.children[i] instanceof Universe) {
                this.game.stage.removeChild(this.game.stage.children[i]);
            }
        }
    }

    _createHealth() {
        this.healthMetric = 100;
        this.health = this.game.add.graphics(0, 0);
        this.game.stage.addChild(this.health);
        this.health.beginFill(0XFFBC3E);
        this.health.arc(this.world.centerX, this.world.centerY, 130, this.game.math.degToRad(-90.00),
            this.game.math.degToRad(-89.9999), true, 360);
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

    _createSpaceShip() {
        this.spaceShip = new SpaceShip({
            game: this.game,
            posX: this.world.centerX,
            posY: this.world.centerY,
            label: 'spaceShip',
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.game.stage.addChild(this.spaceShip);
    }

    _changeShipDirection() {
        this.spaceShipThrust *= -1;
    }
}