import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.readyCount = 0;
    }

    preload() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.add.image(width / 2, height / 2 - 100, 'logo');

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');

            progressBar.clear();
            progressBox.fillStyle(0x888888, 1);
            progressBox.fillRect(
                width / 2 - 150,
                height / 2 - 20,
                300 * value, 
                30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function() {
            progressBox.destroy();
            progressBar.destroy();
            assetText.destroy();
            loadingText.destroy();
            percentText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        this.load.image("bullet", 'assets/level/bulletDark2_outline.png');
        this.load.image("tower", 'assets/level/tank_bigRed.png');
        this.load.image("enemy", 'assets/level/tank_sand.png');
        this.load.image("base", 'assets/level/tankBody_darkLarge_outline.png');
        this.load.image("title", 'assets/ui/title.png');
        this.load.image("cursor", 'assets/ui/cursor.png');
        this.load.image("blueButton1", 'assets/ui/blue_button02.png');
        this.load.image("blueButton2", 'assets/ui/blue_button03.png');

        this.load.image('logo2', 'assets/logo.png');

        // TODO: just to demo loading many assets
        // for (var i = 0; i < 500; i++) {
        //     this.load.image('logo2.'+i, 'assets/logo.png');
        // }

        this.load.tilemapTiledJSON('level1', 'assets/level/level1.json');
        this.load.spritesheet(
            'terrainTiles_default',
            'assets/level/terrainTiles_default.png',
            {
                frameWidth: 64,
                frameHeight: 64
            });
    }
    
    ready () {
        console.log('ready called');
        this.readyCount++;
        if (this.readyCount == 2) {
            this.scene.start('Game');
        }
    }
}