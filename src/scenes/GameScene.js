import 'phaser';
import map from '../config/map.js';
import Enemy from '../objects/Enemy';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.map = map.map(function (arr) {
            return arr.slice();
        });
        this.nextEnemy = 0;
    }

    create() {
        this.createMap();
        this.createPath();
        this.createCursor();
        this.createGroups();
    }

    update (time, delta) {
        if (time > this.nextEnemy) {
            var enemy = this.enemies.getFirstDead();
            if (!enemy) {
                enemy = new Enemy(this, 0, 0, this.path);
                this.enemies.add(enemy);
            }
            
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }
    }

    createMap() {
        this.bgMap = this.make.tilemap({ key: 'level1' });
        this.tiles = this.bgMap.addTilesetImage('terrainTiles_default');
        this.backgroundLayer = this.bgMap
            .createStaticLayer('Background', this.tiles, 0, 0);
        this.add.image(480, 480, 'base');
    }

    createPath() {
        this.graphics = this.add.graphics();

        this.path = this.add.path(96, -32);
        this.path.lineTo(96, 161);
        this.path.lineTo(480, 161);
        this.path.lineTo(480, 544);
        
        // TODO: used for debugging the path
        this.graphics.lineStyle(3, 0xffffff, 1);
        this.path.draw(this.graphics);
    }

    createCursor() {
        this.cursor = this.add.image(32, 32, 'cursor');
        this.cursor.setScale(2);
        this.cursor.alpha = 0;

        this.input.on('pointermove', function (pointer) {
            var i = Math.floor(pointer.y / 64);
            var j = Math.floor(pointer.x / 64);

            if (this.canPlaceTurret(i, j)) {
                this.cursor.setPosition(j * 64 + 32, i * 64 + 32);
                this.cursor.alpha = 1
            } else {
                this.cursor.alpha = 0;
            }
        }.bind(this));
    }

    canPlaceTurret(i, j) {
        return this.map[i][j] === 0;
    }

    createGroups() {
        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });
    }
}