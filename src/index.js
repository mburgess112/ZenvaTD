import Phaser from "phaser";
import config from "./config/config.js";
import GameScene from "./scenes/GameScene.js";
import BootScene from "./scenes/BootScene.js";
import PreloaderScene from "./scenes/PreloaderScene.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.start('Boot');
  }
}

window.onload = function () {
  window.game = new Game();
}