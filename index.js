"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.p2 = require("phaser/build/custom/p2");
window.PIXI = require("phaser/build/custom/pixi");
window.Phaser = require("phaser/build/custom/phaser-split");
const game_1 = require("./src/game");
function preload() {
    game_1.game.load.image("sky", "assets/sky.png");
    game_1.game.load.image("star", "assets/star.png");
    game_1.game.load.spritesheet("dude", "assets/dude.png", 32, 48);
}
function create() {
    game_1.game.physics.startSystem(Phaser.Physics.ARCADE);
    game_1.game.add.sprite(0, 0, "sky");

const boot_1 = require("./src/boot");
const preloader_1 = require("./src/preloader");
const mainMenu_1 = require("./src/mainMenu");
const gameOver_1 = require("./src/gameOver");
function preload() {
}
function create() {
}
function update() {
}
game_1.setPreload(preload);
game_1.setCreate(create);
game_1.setUpdate(update);
game_1.setWidth(800);
game_1.setHeight(600);
game_1.createGame();