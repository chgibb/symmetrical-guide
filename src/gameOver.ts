import {game} from "./game";
import {level1} from "./level1"
class GameOver extends Phaser.State
{
    public titleScreen : Phaser.Sprite;
    public scoreText : Phaser.Text;
    public constructor()
    {
        super();
    }
    public init() : void
    {
    }
    public preload() : void
    {
        this.load.image("preloadBar","assets/preloadbar.png");
    }
    public createButton(
        game : Phaser.Game,
        str : string,
        x : number,
        y : number,
        w : number,
        h : number,
        callback : Function
    ) : void
    {
        let button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);

        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        let text = game.add.text(button1.x, button1.y, str, {font:"14px Arial", fill:"#ffffff", align:"center"});
        text.anchor.setTo(0.5, 0.5);
    }
    public create() : void
    {
        this.titleScreen = game.add.sprite(400, 300, 'splash');
        this.titleScreen.anchor.setTo(0.5, 0.5);

        this.createButton(game, "Play Again", 220, 500, 300, 100, function(){
            level1.player.health = 50;
            this.state.start('Level1');
        });

        this.scoreText = game.add.text(500, 500, 'Score: ', {font: '30px Arial', fill:'#fff'});
        //this.scoreText.text = "Final Score: "+ score1;
    }
}
export let gameOver : GameOver = new GameOver();