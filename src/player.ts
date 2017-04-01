import {game} from "./game";
import {Actor} from "./actor";
export class Player extends Actor
{
    public constructor()
    {
        super();
    }
    public setJumpSound()
    {
        this.addJumpSound("playerJumpSound");
    }

}