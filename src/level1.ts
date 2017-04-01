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
    public player : Phaser.Sprite
    public controls : Controls;
    public constructor()
    {
        super();
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
        this.player = this.add.sprite(100, 10, 'player');
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('idle', [0,1], 1, true);
        this.player.animations.add('jump', [2], 1, true);
        this.player.animations.add('run', [3,4,5,6,7,8], 7, true);
        this.physics.arcade.enable(this.player);
        this.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;

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
            this.player.animations.play('jump');
            jumpsound.play();
        }
        if(this.controls.right.isDown){
            this.player.animations.play('run');
            this.player.scale.setTo(1, 1);
            this.player.body.velocity.x = playerSpeed;
        }
        if(this.controls.left.isDown){
            this.player.animations.play('run');
            this.player.scale.setTo(-1, 1);
            this.player.body.velocity.x = -playerSpeed;
        }
        if(this.controls.up.isDown && (this.player.body.onFloor()||
            this.player.body.touching.down) && this.time.now> jumpTimer){
            this.player.body.velocity.y = -800;
            jumpTimer = this.time.now + 700;
        }
    }
}