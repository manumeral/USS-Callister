'use strict';

import Planet from "../objects/widgets/sprites/Planet";
import SpaceShip from "../objects/widgets/images/SpaceShip";
import Shoot from "../objects/Widgets/sprites/Shoot";
import GAME_CONST from "../const/GAME_CONST";
import Meteor from "../objects/widgets/sprites/Meteor";
import TextUtil from "../util/TextUtil";

export class Play extends Phaser.State {
    preload() {
        console.log("Preloading Play State");
        this.spaceShipThrust = GAME_CONST.SPEED.SPACE_SHIP;
        this.centerPoint = new Phaser.Point(this.world.centerX, this.world.centerY);
        this.lastTimeStamp = Date.now();
        this.difficulty = 1000;
        this.score = 0;
        this.healthMetric = 100;
    }

    create() {
        this._createPlanet();
        this._createSpaceShip();
        this._createScoreText();
        this.game.input.onTap.add(this._changeShipDirection, this);
    }

    update() {
        if(this.healthMetric > 0) {
            this.spaceShip.rotation += this.spaceShipThrust;
        }
    }

    shutdown() {
        for (let i = this.game.stage.children.length - 1; i >= 0; i--) {
            this.game.stage.removeChild(this.game.stage.children[i]);
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
        this.game.camera.shake(0.005, 300);
    }

    _createScoreText() {
        this.scoreText = TextUtil.createText(this.game, {
            positionX: 100,
            positionY: 100,
            message: this.score,
            align: "center",
            backgroundColor: "#000000",
            fill: "#fefefe",
            font: 'nunito-regular',
            fontSize: "60px",
            fontWeight: 800,
            wordWrapWidth: 355,
            anchorX: 0.5,
            anchorY: 0
        });
        this.game.stage.addChild(this.scoreText);
    }
}