import {game} from "./game";
import {Player} from "./player";
import {createCop} from "./cop";
import {createSyringe} from "./syringe"

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
    public copSpawnTimer : number;

    private score: number = 0;
    private scoreLabel: Phaser.Text;
    private healthLabel: Phaser.Text;

    public syringeGroup : Phaser.Group;

    public zuccSprite: Phaser.Sprite;
    public zuccTimer: number;
    public zuccDD: boolean = false;

    public constructor()
    {
        super();
        this.player = new Player();
        this.player.speed = 10;
    }
    public create() : void
    {
        this.copSpawnTimer = this.time.now + 700;
        this.background = this.add.tileSprite(0, 0, 1500, 600, 'background');
        game.physics.arcade.gravity.y = 1400;

         //MAP
        this.map = this.add.tilemap('map', 64, 64);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(0,1);

        //MAP SCORING
        this.scoreLabel = this.game.add.text(26, 3, '' + this.score, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });
        this.healthLabel = this.game.add.text(26, 3, '' + this.player.health, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });
        this.scoreLabel.anchor.setTo(0.5,0.5);

        //PLAYER
        this.player.sprite = this.add.sprite(100, 10, 'Spritez', 'dude1');
        this.player.sprite.anchor.setTo(0.5, 0.5);

        this.player.setJumpSound();

        this.player.sprite.animations.add('idle', ['dude1'], 1, true);
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
        this.syringeGroup = game.add.group();

        //ZUCC
        this.zuccSprite = game.add.sprite(600, 300, 'Spritez', 'zucc');
        this.zuccSprite.physicsEnabled = true;

        game.physics.arcade.enable(this.zuccSprite);
        this.zuccSprite.body.enable = true;
	    this.zuccSprite.body.collideWorldBounds = true;

    }
    public update() : void
    {
        if(this.player.health <= 0)
        {
            game.state.start('GameOver');
        }
        this.scoreLabel.x = game.stage.x;
        this.scoreLabel.y = game.stage.y;
        if(this.time.now > this.copSpawnTimer)
        {
            createCop(100,50,this.copsGroup,this.time.now+1400);
            this.copSpawnTimer = this.time.now + 700;
        }
        if(this.time.now > this.copSpawnTimer)
        {
            createCop(400,50,this.copsGroup,this.time.now+1400);
            this.copSpawnTimer = this.time.now + 700;
        }


        if(this.zuccDD && (this.time.now > this.zuccTimer)) {
            //reset player to normal
            this.player.sprite.loadTexture('Spritez', 'dude1');
            this.player.sprite.animations.add('punch', ['dude1', 'dude2', 'dude3', 'dude4', 'dude5', 'dude6', 'dude5', 'dude4', 'dude3', 'dude2', 'dude1', 'dude1'], 20, false);
            this.zuccDD = false;
        }

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

        this.physics.arcade.collide(this.player.sprite,this.zuccSprite);
        this.physics.arcade.collide(this.layer,this.zuccSprite);
        this.physics.arcade.collide(this.player.sprite,this.layer);
        this.physics.arcade.collide(this.copsGroup,this.layer);
        //this.physics.arcade.collide(this.syringeGroup,this.layer);

        game.physics.arcade.overlap(this.player.sprite,this.copsGroup,this.playerCopCollision,null,this);
        game.physics.arcade.overlap(this.player.sprite, this.syringeGroup, this.playerJabbed, null, this);
        game.physics.arcade.overlap(this.player.sprite, this.zuccSprite, this.zuccD, null, this);

        for(let i : number = 0; i != this.copsGroup.children.length; ++i)
        {
            if((<any>this.copsGroup.children[i]).body.x < this.player.sprite.x)
                (<any>this.copsGroup.children[i]).body.velocity.x = 160;
            else
                (<any>this.copsGroup.children[i]).body.velocity.x = -160;

            if(this.time.now > (<any>this.copsGroup.children[i]).syringeSpawnTimer)
            {
                createSyringe((<any>this.copsGroup.children[i]).body.x,(<any>this.copsGroup.children[i]).body.y,this.syringeGroup);
                (<any>this.copsGroup.children[i]).syringeSpawnTimer = this.time.now + 1400;
            }
        }

        for(let i : number = 0; i != this.syringeGroup.children.length; ++i)
        {
            if(!(<any>this.syringeGroup.children[i]).addedImpulse)
            {
                if((<any>this.syringeGroup.children[i]).body.x < this.player.sprite.x)
                {
                    (<any>this.syringeGroup.children[i]).body.velocity.x = 3000;
                    (<any>this.syringeGroup.children[i]).body.velocity.y = -400;
                    (<any>this.syringeGroup.children[i]).addedImpulse = true;
                }
                else
                {
                    (<any>this.syringeGroup.children[i]).body.velocity.x = -3000;
                    (<any>this.syringeGroup.children[i]).body.velocity.y = -400;
                    (<any>this.syringeGroup.children[i]).addedImpulse = true;
                }
                if((<any>this.syringeGroup.children[i]).body.velocity.y == 0)
                {
                    (<any>this.syringeGroup.children[i]).kill();
                }
            }
        }
        this.scoreLabel.x = this.player.sprite.body.x + (this.player.sprite.body.width / 2);
        this.scoreLabel.y = this.player.sprite.body.y - 30;

        this.healthLabel.x = this.player.sprite.body.x + (this.player.sprite.body.width / 2);
        this.healthLabel.y = this.player.sprite.body.y - 80;

    }
    public playerCopCollision(player : Phaser.Sprite,cop : Phaser.Sprite) : void
    {
        this.player.sprite.animations.play('punch');
        this.player.punch.play();
        if(cop.body.x > player.body.x)
        {
            player.body.x += -30;
        }
        else
            player.body.x += 30;
        cop.destroy();
        this.score += 1;
        this.scoreLabel.text = '' + this.score;
    }

    public playerJabbed(player : Phaser.Sprite,syringe : Phaser.Sprite) : void
    {
        if(!this.zuccDD) {
            this.player.pain.play();
            syringe.destroy();
            this.player.health -= 1;
            this.healthLabel.text = "" + this.player.health;
        } else {
            syringe.body.velocity.y = 1500;
            syringe.body.velocity.x = 1500;
        }
        
        
    }

    public zuccD(player : Phaser.Sprite,zucc : Phaser.Sprite) : void
    {
        console.log("hit zucc");
        this.zuccTimer = this.time.now + 5000;
        this.player.sprite.loadTexture('Spritez', 'dude1p');
        this.player.sprite.animations.add('punch', ['dude1p', 'dude2p', 'dude3p', 'dude4p', 'dude5p', 'dude6p', 'dude5p', 'dude4p', 'dude3p', 'dude2p', 'dude1p', 'dude1p'], 20, false);
        this.zuccDD = true;
    }
}
export let level1 : Level1 = new Level1();