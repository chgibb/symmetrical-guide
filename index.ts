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
import {mainMenu} from "./src/mainMenu";
import {gameOver} from "./src/gameOver";

import {level1} from "./src/level1";


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
setHeight(800);
createGame();

game.state.add("Boot",boot);
game.state.add("Preloader",preLoader)
game.state.add("MainMenu",mainMenu);
game.state.add("GameOver",gameOver);
game.state.add("Level1",level1);       

game.state.start("Boot");