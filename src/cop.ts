import {game} from "./game";
import {Actor} from "./actor";
export class Cop extends Actor
{
    public constructor(x : number,y : number,group : Phaser.Group)
    {
        super();
        this.jumpTimer = 0;
        this.sprite = game.add.sprite(x,y,"ninja");
        this.sprite.animations.add('running', [1,2,3,4,5,6,7,8,9,10], 11, true);
        this.sprite.animations.add('dead', [11,12,13,14,15], 6, true);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(0.1,0.1);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        group.add(this.sprite);
    }

}