'use strict';

import Universe from "../objects/widgets/images/Universe";
import PlayButton from "../objects/widgets/buttons/PlayButton";
import GAME_CONST from "../const/GAME_CONST";

export class Preload extends Phaser.State {
    preload() {
        console.log("Preloading Preload State");
        this.loadingComplete = false;
        this._createBackground();
        this._createLoader();
        this.load.onLoadComplete.addOnce(this._onLoadComplete, this);
        this.load.image('planet', 'assets/images/planet.svg');
        this.load.image('spaceShip', 'assets/images/spaceShip.png');
        this.load.image('asteroid', 'assets/images/meteor.png');
        this.load.image('meteor', 'assets/images/asteroid_burned.png');
        this.load.image('playGame', 'assets/images/playGame.png');
        this.load.spritesheet('shoot', 'assets/images/shoot.png', 153, 153);
        this.load.audio('gameSound', 'assets/audio/Theme.mp3');
        this.load.audio('tapSound', 'assets/audio/Tap.mp3');
    }

    create() {
    }

    update() {
        if(this.loadingComplete) {
            console.log("Loading Complete");
            this.progressBackground.destroy();
            this.progressBar.destroy();
            this._createPlayButton();
            this.loadingComplete = false;
        }
    }

    shutdown() {
        for (let i = this.game.stage.children.length - 1; i >= 0; i--) {
            if(! (this.game.stage.children[i] instanceof Universe)) {
                this.game.stage.removeChild(this.game.stage.children[i]);
            }
        }
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

    _createLoader() {
        this.progressBar = this.add.sprite(this.world.centerX - 360, this.world.centerY, "progressBar");
        this.progressBar.anchor.setTo(0, 0.5);
        this.game.stage.addChild(this.progressBar);
        this.load.setPreloadSprite(this.progressBar);

        this.progressBackground = this.add.sprite(this.world.centerX, this.world.centerY, "progressBackground");
        this.progressBackground.anchor.setTo(0.5, 0.5);
        this.game.stage.addChild(this.progressBackground);
    }

    _onLoadComplete() {
        this.sound = this.game.add.audio('gameSound');
        this.tapSound = this.game.add.audio('tapSound');
        this.game.sound.setDecodedCallback([this.sound, this.tapSound], this._start, this);
    }

    _start() {
        this.sound.play();
        this.sound.mute = false;
        this.sound.loop = true;
        this.sound.loopFull(GAME_CONST.MUSIC.VOLUME.THEME);
        this.loadingComplete = true;
    }

    _createPlayButton() {
        this.playButtton = new PlayButton({
            game: this.game,
            posX: this.world.centerX,
            posY: this.world.centerY,
            label: 'playGame',
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.game.stage.addChild(this.playButtton);
    }
}