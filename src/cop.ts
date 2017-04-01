import {game} from "./game";
import {Actor} from "./actor";
export class Cop extends Phaser.Sprite
{

}

export function createCop(x : number,y : number,group : Phaser.Group)
{
    let cop : Cop;
    cop = game.add.sprite(x,y,"Spritez","badCop1");
    cop.animations.add('running', [1,2,3,4,5,6,7,8,9,10], 11, true);
    cop.animations.add('dead', [11,12,13,14,15], 6, true);
    //cop.anchor.setTo(0.5, 0.5);
    let ran = Math.floor(Math.random() * 11);
    if(ran <= 5)
        cop.scale.setTo(-1,1);
    else
        cop.scale.setTo(1,1);
    game.physics.enable(cop, Phaser.Physics.ARCADE);
    cop.body.collideWorldBounds = true;
    group.add(cop);
}