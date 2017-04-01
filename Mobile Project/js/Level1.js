Ninja = function(index, game, x, y){
    this.ninja = game.add.sprite(x, y, 'ninja');
    this.ninja.animations.add('running', [1,2,3,4,5,6,7,8,9,10], 11, true);
    this.ninja.animations.add('dead', [11,12,13,14,15], 6, true);
    this.ninja.anchor.setTo(0.5, 0.5);
    this.ninja.scale.setTo(0.1,0.1);
    this.ninja.name = index.toString();
    game.physics.enable(this.ninja, Phaser.Physics.ARCADE);
    this.ninja.body.collideWorldBounds = true;
    this.ninja.body.velocity.x = 100;
    ninjaGroup.add(this.ninja);

    function collideNinja(){
        game.switch.state('GameOver', score);
    }

    function kill(){
        this.ninja.kill();
    }
}

Ninja2 = function(index, game, x, y){
    this.ninja = game.add.sprite(x, y, 'ninja');
    this.ninja.animations.add('running', [1,2,3,4,5,6,7,8,9,10], 11, true);
    this.ninja.animations.add('dead', [11,12,13,14,15], 6, true);
    this.ninja.anchor.setTo(0.5, 0.5);
    this.ninja.scale.setTo(-0.1,0.1);
    this.ninja.name = index.toString();
    game.physics.enable(this.ninja, Phaser.Physics.ARCADE);
    this.ninja.body.collideWorldBounds = true;
    this.ninja.body.velocity.x = -100;
    ninjaGroup2.add(this.ninja);
    console.log(ninjaGroup2.children.length);
}

Coin = function(index, game, x, y){
    this.coin = game.add.sprite(x, y, 'coins');
    this.coin.animations.add('idle', [0,1,2,3,4,5], 7, true);
    this.coin.animations.play('idle');
    game.physics.enable(this.coin, Phaser.Physics.ARCADE);
    this.coin.body.collideWorldBounds = true;
    coinGroup.add(this.coin);
}

Game.Level1 = function(game){
    this.max_coins = 10;
};

var map;
var layer;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var leftButton;
var rightButton;
var jumpButton;
var coinGroup;
var ninjaGroup;
var ninjaGroup2;
var ninjaCount = 0;
var ninjaCount2 = 0;
var coinCount = 0;
var score = 0;
var scoreText;

var bgmusic;
var jumpsound;
var coinpick;

Game.Level1.prototype = {
    create:function(game){

        score = 0;
        bgmusic = game.add.audio('BGMusic');
        jumpsound = game.add.audio('jumpsound');
        coinpick = game.add.audio('coin');


        bgmusic.play();
        this.stage.backgroundColor = '#3A5963';
        this.physics.arcade.gravity.y = 1400;
        this.add.sprite(0, 0, 'background');
        scoreText = game.add.text(20, 50, 'Score: ', {font: '32px Arial', fill:'#000'});
        scoreText.fixedToCamera = true;
        //MAP
        map = this.add.tilemap('map', 64, 64);
        map.addTilesetImage('tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0,1);

        //COINS
        coinGroup = game.add.group();
        ninjaGroup = game.add.group();
        ninjaGroup2 = game.add.group();

        //PLAYER
        player = this.add.sprite(100, 10, 'player');
        player.anchor.setTo(0.5, 0.5);

        player.animations.add('idle', [0,1], 1, true);
        player.animations.add('jump', [2], 1, true);
        player.animations.add('run', [3,4,5,6,7,8], 7, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;

        //CONTROLS
        controls = {
            right : this.input.keyboard.addKey(Phaser.Keyboard.D),
            left : this.input.keyboard.addKey(Phaser.Keyboard.A),
            up : this.input.keyboard.addKey(Phaser.Keyboard.W)
        };

        leftButton = this.add.button(this.world.centerX + 40, this.world.centerY + 150, 'leftButton', function(){
            player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x = -playerSpeed;
        }, this);
        leftButton.fixedToCamera = true;
        rightButton = this.add.button(this.world.centerX +100, this.world.centerY + 150, 'rightButton', function(){
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x = playerSpeed;
        }, this);
        rightButton.fixedToCamera = true;
        jumpButton = this.add.button(this.world.centerX - 570, this.world.centerY + 150, 'jumpButton', function(){
            if((player.body.onFloor()|| player.body.touching.down) && this.time.now> jumpTimer){
                player.body.velocity.y = -800;
                jumpTimer = this.time.now + 700;
                jumpsound.play();
            }
        }, this);
        jumpButton.fixedToCamera = true;

        game.time.events.repeat(Phaser.Timer.SECOND * 2, 6000, spawnNinja, this);
        game.time.events.repeat(Phaser.Timer.SECOND * 3, 6000, spawnNinja2, this);
        game.time.events.repeat(Phaser.Timer.SECOND * 9, 6000, spawnCoin, this);
        function spawnNinja(){
            if(ninjaCount2<3){
                new Ninja(ninjaCount, game, game.rnd.integerInRange(0, 1000), -10);
                ninjaCount++;
            }
            else{
                return;
            }
        }

        function spawnNinja2(){
            if(ninjaCount<3){
                new Ninja2(ninjaCount, game, game.rnd.integerInRange(0, 1000), -10);
                ninjaCount2++;
            }
            else{
                return;
            }
        }

        function spawnCoin(){
            new Coin(coinCount, game, game.rnd.integerInRange(50, game.width-100, game.rnd.integerInRange(0, game.height)));
            coinCount++;
        }

    },

    update:function(game){
        score++;
        scoreText.text = 'Score: '+ score;
        this.physics.arcade.collide(coinGroup, layer);
        this.physics.arcade.collide(ninjaGroup, layer);
        this.physics.arcade.collide(ninjaGroup2, layer);
        this.physics.arcade.collide(player, layer);

        game.physics.arcade.overlap(player, ninjaGroup, collisionHandler, null, this);
        game.physics.arcade.overlap(player, ninjaGroup2, collisionHandler, null, this);
        game.physics.arcade.overlap(player, coinGroup, pickUpCoin, null, this);

        if(controls.up.isDown){
            player.animations.play('jump');
            jumpsound.play();
        }
        if(controls.right.isDown){
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x = playerSpeed;
        }
        if(controls.left.isDown){
            player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x = -playerSpeed;
        }
        if(controls.up.isDown && (player.body.onFloor()||
            player.body.touching.down) && this.time.now> jumpTimer){
            player.body.velocity.y = -800;
            jumpTimer = this.time.now + 700;
        }

        for(var i = 0, len = ninjaGroup2.children.length; i<len; i++){
            //console.log(ninjaGroup.children[i]);
            ninjaGroup2.children[i].animations.play('running');
            if(ninjaGroup2.children[i].body.x<65){
                //ninjaGroup.children[i].animations.play('dead');

                ninjaGroup2.children[i].kill();
            }
        }

        for(var i = 0, len = ninjaGroup.children.length; i<len; i++){
            //console.log(ninjaGroup.children[i]);
            ninjaGroup.children[i].animations.play('running');
            if(ninjaGroup.children[i].body.x > 1155){
                ninjaCount--;
                //ninjaGroup.children[i].animations.play('dead');
                ninjaGroup.children[i].kill();
            }
        }
    }
}

function collisionHandler(player, Ninja, game){
    this.state.start('GameOver', score);
    bgmusic.destroy();
    //this.cache.removeSound('BGMusic');
}

var pickUpCoin = function(player, coin){
    coin.kill();
    coinpick.play();
    score+=100;
    coinCount--;
}
