import {game} from "./game";
import {Actor} from "./actor";
export class Syringe extends Phaser.Sprite
{
    public addedImpulse : boolean;
}

export function createSyringe(x : number,y : number,group : Phaser.Group)
{
    let syringe : Syringe;
    syringe = (<any>game.add.sprite(x,y,"Spritez","copBullet"));
    syringe.addedImpulse = false;
    //syringe.animations.add('running', [1,2,3,4,5,6,7,8,9,10], 11, true);
    //syringe.animations.add('dead', [11,12,13,14,15], 6, true);
    let ran = Math.floor(Math.random() * 11);
    if(ran <= 5)
        syringe.scale.setTo(-1,1);
    else
        syringe.scale.setTo(1,1);
    game.physics.enable(syringe, Phaser.Physics.ARCADE);
    syringe.body.collideWorldBounds = true;
    group.add(syringe);
}