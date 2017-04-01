import {game} from "./game";
export class Actor
{
    public jumpTimer : number;
    public jumpSound : Phaser.Sound;
    public sprite : Phaser.Sprite;
    public speed : number;
    public constructor()
    {
    }
    public addJumpSound(
        key: string,
        volume?: number,
        loop?: boolean,
        connect?: boolean
    ) : void
    {
        this.jumpSound = game.add.audio(key);
    }
}