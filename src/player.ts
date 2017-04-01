import {game} from "./game";
import {Actor} from "./actor";
export class Player extends Actor
{
    public punch : Phaser.Sound;
    public whoosh : Phaser.Sound;

    public constructor()
    {
        super();
    }
    public setJumpSound()
    {
        this.punch = game.add.audio("punch");
        this.whoosh = game.add.audio("whoosh");
        this.addJumpSound("playerJumpSound");
    }

}