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

import {boot} from "./src/boot";
import {preLoader} from "./src/preloader";

game.state.add("Boot",boot);
game.state.add("Preloader",preLoader)


function preload()
{

}
function create()
{   

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

