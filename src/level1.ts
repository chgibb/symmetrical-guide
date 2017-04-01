import {game} from "./game";
import {Player} from "./player";
import {createCop} from "./cop";
interface Controls
{
    left : Phaser.Key;
    right : Phaser.Key;
    up : Phaser.Key;
    space: Phaser.Key;
}
export class Level1 extends Phaser.State
{
    public map : Phaser.Tilemap;
    public background : Phaser.TileSprite;
    public layer : Phaser.TilemapLayer;
    public player : Player;
    public controls : Controls;
    public copsGroup : Phaser.Group;
    public constructor()
    {
        super();
        this.player = new Player();
        this.player.speed = 10;
    }
    public create() : void
    {
        this.background = this.add.tileSprite(0, 0, 1500, 600, 'background');
        game.physics.arcade.gravity.y = 1400;

         //MAP
        this.map = this.add.tilemap('map', 64, 64);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(0,1);

        //PLAYER
        //this.player.sprite = this.add.sprite(100, 10, 'player');
        this.player.sprite = this.add.sprite(100, 10, 'Spritez', 'dude1');
        this.player.sprite.anchor.setTo(0.5, 0.5);

        this.player.setJumpSound();

        this.player.sprite.animations.add('idle', ['dude1'], 1, true);
        //this.player.sprite.animations.add('idle', [0,1], 1, true);
        //this.player.sprite.animations.add('jump', [2], 1, true);
        //this.player.sprite.animations.add('run', [3,4,5,6,7,8], 7, true);
        this.player.sprite.animations.add('run', ['dude1', 'dude2', 'dude3', 'dude4', 'dude5', 'dude6', 'dude5', 'dude4', 'dude3', 'dude2', 'dude1', 'dude1'], 20, true);
        this.player.sprite.animations.add('punch', ['dude1', 'dude2', 'dude3', 'dude4', 'dude5', 'dude6', 'dude5', 'dude4', 'dude3', 'dude2', 'dude1', 'dude1'], 20, false);
        this.physics.enable(this.player.sprite,Phaser.Physics.ARCADE);
        this.camera.follow(this.player.sprite);
        this.player.sprite.body.collideWorldBounds = true;

        //CONTROLS
        this.controls = {
            right : this.input.keyboard.addKey(Phaser.Keyboard.D),
            left : this.input.keyboard.addKey(Phaser.Keyboard.A),
            up : this.input.keyboard.addKey(Phaser.Keyboard.W),
            space : this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        this.copsGroup = game.add.group();

      /*  setInterval(
            function(){
                createCop(100,100,this.copsGroup);
                createCop(200,100,this.copsGroup);
            },500
        );*/
    }
    public update() : void
    {
        createCop(100,100,this.copsGroup);
                createCop(200,100,this.copsGroup);
        this.background.tilePosition.x -= 1;
        this.physics.arcade.collide(this.player.sprite,this.layer);
        if(this.controls.right.isDown){
            //this.player.sprite.animations.play('run');
            this.player.sprite.scale.setTo(1, 1);
            this.player.sprite.body.x += this.player.speed;
        }
        if(this.controls.left.isDown){
           // this.player.sprite.animations.play('run');
            this.player.sprite.scale.setTo(-1, 1);
            this.player.sprite.body.x -= this.player.speed;
        }
        if(this.controls.up.isDown && this.time.now > this.player.jumpTimer){
            //this.player.sprite.animations.play('jump');
            this.player.jumpSound.play();
            this.player.sprite.body.velocity.y = -800;
            this.player.jumpTimer = this.time.now + 700;
            //this.player.sprite.animations.play('jump');
            this.player.jumpSound.play();
        }
        if(this.controls.space.isDown ){
            
            let self = this;
            setTimeout(function(){self.player.whoosh.play();},200);  
        }

        this.physics.arcade.collide(this.player.sprite,this.layer);
        this.physics.arcade.collide(this.copsGroup,this.layer);

        game.physics.arcade.overlap(this.player.sprite,this.copsGroup,this.playerCopCollision,null,this);

        for(let i : number = 0; i != this.copsGroup.children.length; ++i)
        {
            if((<any>this.copsGroup.children[i]).body.x < this.player.sprite.x)
                (<any>this.copsGroup.children[i]).body.velocity.x = 160;
            else
                (<any>this.copsGroup.children[i]).body.velocity.x = -160;
        }

    }
    public playerCopCollision(player : Player,cop : Phaser.Sprite) : void
    {
        this.player.sprite.animations.play('punch');
        this.player.punch.play();
        cop.kill();
    }
}
export let level1 : Level1 = new Level1();