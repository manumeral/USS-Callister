'use strict';

import Universe from "../objects/widgets/images/Universe";
import Planet from "../objects/widgets/sprites/Planet";
import SpaceShip from "../objects/widgets/images/SpaceShip";
import Shoot from "../objects/Widgets/sprites/Shoot";
import GAME_CONST from "../const/GAME_CONST";
import Meteor from "../objects/widgets/sprites/Meteor";

export class Play extends Phaser.State {
    preload() {
        console.log("Preloading Play State");
        this.spaceShipThrust = GAME_CONST.SPEED.SPACE_SHIP;
        this.centerPoint = new Phaser.Point(this.world.centerX, this.world.centerY);
        this.game.physics.arcade.checkCollision.down = false;
        this.game.physics.arcade.checkCollision.up = false;
        this.game.physics.arcade.checkCollision.right = false;
        this.game.physics.arcade.checkCollision.left = false;
        this.lastTimeStamp = Date.now();
        this.difficulty = 1000;
    }

    create() {
        this._createHealth();
        this._createPlanet();
        this._createSpaceShip();
        // this.game.physics.arcade.gravity.y = 980;
        this.game.input.onTap.add(this._changeShipDirection, this);
        this.projectiles = this.game.add.group();
        this.meteors = this.game.add.group();
        this.game.stage.addChild(this.projectiles);
        this.game.stage.addChild(this.meteors);
    }

    update() {
        if(this.healthMetric >= 0) {
            this.spaceShip.rotation += this.spaceShipThrust;
            this.meteors.forEach(this.game.physics.arcade.moveToObject,this.game.physics.arcade, false, this.planet, 200);
            if (Date.now() - this.lastTimeStamp > this.difficulty) {
                let position;
                let prob = Math.random();
                if (prob < 0.25) {
                    position = new Phaser.Point(Math.random() * 1080, -256);
                }
                else if(prob < 0.5) {
                    position = new Phaser.Point(1080 + 256, 1920 * Math.random());
                }
                else if(prob < 0.75) {
                    position = new Phaser.Point(1080 * Math.random(), 1920 + 256);
                }
                else {
                    position = new Phaser.Point(-256, 1920 * Math.random());
                }
                let meteor = new Meteor({
                    game: this.game,
                    posX: position.x,
                    posY: position.y,
                    label: 'meteor',
                    angle: position.angle(this.centerPoint, true),
                    anchorX: 0.5,
                    anchorY: 0.5
                });
                this.meteors.add(meteor);
                this.lastTimeStamp = Date.now();
            }
            this.game.physics.arcade.collide(this.meteors, this.planet, function(planet, meteor) {
                meteor.destroy();
                this.healthMetric-=12.5;
                this._decreaseHealth();
            }, null, this);
            this.game.physics.arcade.collide(this.meteors, this.projectiles, function(shoot, meteor) {
                meteor.kill();
                shoot.kill();
            }, null, this);
        }
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
        this._shootProjectile();
    }

    _shootProjectile() {
        let position = this.spaceShip.previousPosition;
        let shoot = new Shoot({
            game: this.game,
            posX: position.x,
            posY: position.y,
            label: 'shoot',
            angle: position.angle(this.centerPoint, true),
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.projectiles.add(shoot);
    }

    _decreaseHealth() {
        this.health && this.health.clear();
        this.health && this.health.beginFill(0XFFBC3E);
        this.health && this.health.arc(this.world.centerX, this.world.centerY, 130, this.game.math.degToRad(-90.00),
            this.game.math.degToRad(((100-this.healthMetric)/100.0)*360 - 90), true, 360);
    }
}