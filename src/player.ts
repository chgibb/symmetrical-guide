import {game} from "./game";
export class Player
{
    public jumpTimer : number;
    public jumpSound : Phaser.Sound;
    public sprite : Phaser.Sprite;
    public constructor()
    {
        
    }
    public addAudio()
    {
        this.jumpSound = game.add.audio('jumpsound');
    }

}