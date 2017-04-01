import {game} from "./game";
class MainMenu extends Phaser.State
{
    public bgMusic : Phaser.Sound;
    public titleScreen : Phaser.Sprite;
    public constructor()
    {
        super();
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
        this.bgMusic = game.add.audio('BGMusic');
        this.bgMusic.play();
        this.titleScreen = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
        this.titleScreen.anchor.setTo(0.5, 0.5);

        this.createButton
        (
            game, "Play", game.world.centerX + 20, game.world.centerY, 300, 100, 
            function()
            {
                game.state.start('Level1');
            }
        );
    }
}
export let mainMenu : MainMenu = new MainMenu();