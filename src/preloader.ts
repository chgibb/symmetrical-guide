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
        game.load.tilemap('map', 'assets/Level1.csv');
        game.load.image('tileset', 'assets/tilesetLevel1.png');

        game.load.spritesheet('player', 'assets/player.png', 24, 26);
        game.load.spritesheet('coins', 'assets/coins.png', 30, 30);
        game.load.spritesheet('ninja', 'assets/ninja.png', 512, 512);

        game.load.image('splash', 'assets/splash.png');
        game.load.image('button', 'assets/button.png');
        game.load.image('gameover', 'assets/gameover.png');
        game.load.image('background', 'assets/background.png');

        game.load.image('leftButton', 'assets/leftArrow.png');
        game.load.image('rightButton', 'assets/rightArrow.png');
        game.load.image('jumpButton', 'assets/jumpButton.png');

        game.load.audio('playerJumpSound', 'assets/Jump.mp3');
        game.load.audio('coin', 'assets/Coin.mp3');
        game.load.audio('BGMusic', 'assets/BGMusic.mp3');
        game.load.audio('throw', 'assets/throw.wav');
        game.load.audio('punch', 'assets/punch.mp3');
        game.load.audio('finalPunch', 'assets/finalPunch.mp3');
        game.load.audio('whoosh', 'assets/whoosh.mp3');

        game.load.atlas('Spritez', 'assets/spritez.png', 'assets/spritez.json');
    }
    public create() : void
    {
        game.state.start('MainMenu');
    }
}
export let preLoader : PreLoader = new PreLoader();