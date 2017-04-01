import {game} from "./game";
import {Actor} from "./actor";
export class Player extends Actor
{
    public punch : Phaser.Sound;

    public constructor()
    {
        super();
        this.punch = game.add.audio("punch");
    }
    public setJumpSound()
    {
        this.addJumpSound("playerJumpSound");
    }

}