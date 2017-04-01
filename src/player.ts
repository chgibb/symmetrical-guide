import {game} from "./game";
import {Actor} from "./actor";
export class Player extends Actor
{
    public jumpTimer : number;
    public jumpSound : Phaser.Sound;
    public sprite : Phaser.Sprite;
    public constructor()
    {
        
    }
    public addJumpSound()
    {
        super.addJumpSound();
    }

}