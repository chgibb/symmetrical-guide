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

function preload()
{
    game.load.image("sky","assets/sky.png");
    game.load.image("star","assets/star.png");
    game.load.spritesheet("dude","assets/dude.png",32,48);
}
function create()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,"sky");

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

