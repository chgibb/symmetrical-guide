/// <reference path="node_modules/phaser/typescript/phaser.d.ts" />
/// <reference types="node" />
(<any>window).p2 = require("phaser/build/custom/p2");
(<any>window).PIXI = require("phaser/build/custom/pixi");
(<any>window).Phaser = require("phaser/build/custom/phaser-split");

import * as game from "./src/game";

function preload(){}
function create(){}
function update(){}

game.setPreload(preload);
game.setCreate(create);
game.setUpdate(update);
game.setWidth(800);
game.setHeight(600);
game.createGame();

