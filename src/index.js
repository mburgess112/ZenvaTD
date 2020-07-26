import Phaser from "phaser";
import config from "./config/config.js";
import GameScene from "./scenes/GameScene.js";
import BootScene from "./scenes/BootScene.js";
import PreloaderScene from "./scenes/PreloaderScene.js";
import TitleScene from "./scenes/TitleScene.js";
import UIScene from "./scenes/UIScene.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('UI', UIScene);

    this.scene.start('Boot');
  }
}

window.onload = function () {
  window.game = new Game();
}