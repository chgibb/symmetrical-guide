"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.p2 = require("phaser/build/custom/p2");
window.PIXI = require("phaser/build/custom/pixi");
window.Phaser = require("phaser/build/custom/phaser-split");
const game_1 = require("./src/game");
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
game_1.game.state.add("Boot", boot_1.boot);
game_1.game.state.add("Preloader", preloader_1.preLoader);
game_1.game.state.add("MainMenu", mainMenu_1.mainMenu);
game_1.game.state.add("GameOver", gameOver_1.gameOver);
game_1.game.state.start("Boot");
