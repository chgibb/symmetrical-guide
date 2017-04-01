import {game} from "./game";
import {Player} from "./player";
interface Controls
{
    left : Phaser.Key;
    right : Phaser.Key;
    up : Phaser.Key;
}
export class Level1 extends Phaser.State
{
    public map : Phaser.Tilemap;
    public layer : Phaser.TilemapLayer;
    public player : Player;
    public controls : Controls;
    public constructor()
    {
        super();
        this.player = new Player();
        this.player.speed = 150;
    }
    public create() : void
    {
         //MAP
        this.map = this.add.tilemap('map', 64, 64);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(0,1);

        //PLAYER
        this.player.sprite = this.add.sprite(100, 10, 'player');
        this.player.sprite.anchor.setTo(0.5, 0.5);

        this.player.sprite.animations.add('idle', [0,1], 1, true);
        this.player.sprite.animations.add('jump', [2], 1, true);
        this.player.sprite.animations.add('run', [3,4,5,6,7,8], 7, true);
        this.physics.arcade.enable(this.player.sprite);
        this.camera.follow(this.player.sprite);
        this.player.sprite.body.collideWorldBounds = true;

        //CONTROLS
        this.controls = {
            right : this.input.keyboard.addKey(Phaser.Keyboard.D),
            left : this.input.keyboard.addKey(Phaser.Keyboard.A),
            up : this.input.keyboard.addKey(Phaser.Keyboard.W)
        };
    }
    public update() : void
    {
        if(this.controls.up.isDown){
            this.player.sprite.animations.play('jump');
            this.player.jumpSound.play();
        }
        if(this.controls.right.isDown){
            this.player.sprite.animations.play('run');
            this.player.sprite.scale.setTo(1, 1);
            this.player.sprite.body.velocity.x = this.player.speed;
        }
        if(this.controls.left.isDown){
            this.player.sprite.animations.play('run');
            this.player.sprite.scale.setTo(-1, 1);
            this.player.sprite.body.velocity.x = -this.player.speed;
        }
        if(this.controls.up.isDown && (this.player.sprite.body.onFloor()||
            this.player.sprite.body.touching.down) && this.time.now> this.player.jumpTimer){
            this.player.sprite.body.velocity.y = -800;
            this.player.jumpTimer = this.time.now + 700;
        }
    }
}
export let level1 : Level1 = new Level1();