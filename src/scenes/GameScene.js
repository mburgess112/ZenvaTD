import 'phaser';
import logoImg from '../assets/logo.png';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
    }
    
    create() {
        const logo = this.add.image(400, 150, 'logo2');
    } 
}