let preload : () => void;
let create : () => void;
let update : () => void;
let width : number = 0;
let height : number = 0;
export let game : Phaser.Game;
export function setWidth(newWidth : number) : void
{
    width = newWidth;
} 
export function setHeight(newHeight : number) : void
{
    height = newHeight;
}
export function setPreload(newPreLoad : () => void) : void
{
    preload = newPreLoad;
}
export function setCreate(newCreate : () => void) : void
{
    create = newCreate;
}
export function setUpdate(newUpdate : () => void) : void
{
    update = newUpdate;
}
export function createGame()
{
    game = new Phaser.Game(
        width,height,
        Phaser.AUTO,
        '',{
            preload : preload,
            create : create,
            update : update
        }
    );
}