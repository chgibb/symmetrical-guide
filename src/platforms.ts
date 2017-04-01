(<any>window).p2 = require("phaser/build/custom/p2");
(<any>window).PIXI = require("phaser/build/custom/pixi");
(<any>window).Phaser = require("phaser/build/custom/phaser-split");

import {game} from "./game";
export let platformGroup : Phaser.Group;
export let platforms : Array<any>;
export function addPlatorm(x : number,y : number, key : string)
{
    platforms.push(platformGroup.create(x,y,key));
}

export function preLoad()
{
    game.load.image("ground","assets/platform.png");
}
export function create()
{
    platformGroup = game.add.group();
    platformGroup.enableBody = true;
}
export function update()
{

}