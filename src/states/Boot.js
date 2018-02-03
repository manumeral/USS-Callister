'use strict';

import GAME_CONST from "../const/GAME_CONST";

export class Boot extends Phaser.State {
    preload() {
        console.log("Preloading Boot State");
        this.load.image('universe', "assets/images/backGroundTheme.jpg");
        this.load.image('progressBackground', 'assets/images/progressBackground.png');
        this.load.image('progressBar', 'assets/images/progressBar.png');
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(false, true);
        this.input.maxPointers = 1;
        this.state.start(GAME_CONST.STATES.PRELOAD);
    }
}