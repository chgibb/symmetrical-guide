import {game} from "./game";
class PreLoader extends Phaser.State
{
    public preloadBar : Phaser.Sprite;
    public constructor()
    {
        super();
    }
    public preload() : void
    {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);

        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);

        //LOAD assets
        this.load.tilemap('map', 'assets/Level1.csv');
        this.load.image('tileset', 'assets/tileset2.png');

        this.load.spritesheet('player', 'assets/player.png', 24, 26);
        this.load.spritesheet('coins', 'assets/coins.png', 30, 30);
        this.load.spritesheet('ninja', 'assets/ninja.png', 512, 512);

        this.load.image('splash', 'assets/splash.png');
        this.load.image('button', 'assets/button.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('background', 'assets/background.png');

        this.load.image('leftButton', 'assets/leftArrow.png');
        this.load.image('rightButton', 'assets/rightArrow.png');
        this.load.image('jumpButton', 'assets/jumpButton.png');

        this.load.audio('jumpsound', 'assets/Jump.mp3');
        this.load.audio('coin', 'assets/Coin.mp3');
        this.load.audio('BGMusic', 'assets/BGMusic.mp3');
    }
    public create() : void
    {
        game.state.start('MainMenu');
    }
}
export let preLoader : PreLoader = new PreLoader();