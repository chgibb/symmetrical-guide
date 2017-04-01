/// <reference path="node_modules/phaser/typescript/phaser.d.ts" />
/// <reference types="node" />
(<any>window).p2 = require("phaser/build/custom/p2");
(<any>window).PIXI = require("phaser/build/custom/pixi");
(<any>window).Phaser = require("phaser/build/custom/phaser-split");

import {game,
    setCreate,
    setPreload,
    setUpdate,
    setWidth,
    setHeight,
    createGame
}from "./src/game";
import * as platforms from "./src/platforms";

let ground;

function preload()
{
    game.load.image("sky","assets/sky.png");
    game.load.image("star","assets/star.png");
    game.load.spritesheet("dude","assets/dude.png",32,48);
    platforms.preLoad();
}
function create()
{   
    platforms.create();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,"sky");

    platforms.addPlatorm(0,game.world.height-64,"ground");

    /*ground = platforms.platformGroup.create(0,game.world.height-64,"ground");
    ground.scale.setTo(2,2);
    ground.body.immovable = true;*/
}
function update()
{

}

setPreload(preload);
setCreate(create);
setUpdate(update);
setWidth(800);
setHeight(600);
createGame();

