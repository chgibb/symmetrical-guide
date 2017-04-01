import {game} from "./game";
import {Actor} from "./actor";
export class Player extends Actor
{
    public constructor()
    {
        super();
    }
    public addJumpSound()
    {
        super.addJumpSound("playerJumpSound");
    }

}