// Game constructor
class Game extends Phaser.Game {
    constructor() {
        // init game
        super(640, 400, Phaser.CANVAS, "content", State);
    }
}

// State class for all the meat
class State extends Phaser.State {
    private static BALL_SPEED = 5;
    private static CANNON_SPEED = 2;

    private cannon: Phaser.Sprite;
    private cannonTip: Phaser.Point = new Phaser.Point();

    private _space: Phaser.Key;

    private balloons: Phaser.Group;
    private balloonsCollisionGroup: Phaser.Physics.P2.CollisionGroup;

    private balls: Phaser.Group;
    private ballsCollisionGroup: Phaser.Physics.P2.CollisionGroup;

    private collidedCollisionGroup: Phaser.Physics.P2.CollisionGroup;
    
    private Hwalls: Phaser.Group;
    private Vwalls: Phaser.Group;

    private wallCollisionGroup: Phaser.Physics.P2.CollisionGroup;

    private ballIndex: number = 0;

    private score: number = 0;
    private scoreLabel: Phaser.Text;

    private explode: Phaser.Sound;
    private balloonExplode: Phaser.Sound;

    private selected: Phaser.Sprite;

    private ballMaterial: Phaser.Physics.P2.Material;
    private wallMaterial: Phaser.Physics.P2.Material;
    private balloonMaterial: Phaser.Physics.P2.Material;

    private sprite1: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;

    preload() {
        // get backGroundImage
        this.game.load.image("BG", "assets/landscape.png");
        // load sprite images 
        this.game.load.atlas("Atlas", "assets/Atlas.png", "assets/Atlas.json");

        // load sound
        this.game.load.audio("explode", "assets/explosion.mp3");
        this.game.load.audio("balloonExplode", "assets/explode1.wav");

    }

    create() {
        // set background
        this.add.image(20,-5,"BG");

        // set explodes
        this.explode = this.game.add.audio("explode");
        this.balloonExplode = this.game.add.audio("balloonExplode");

        // set physiscs engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // set cannonBarrel
        this.cannon = this.game.add.sprite(this.world.centerX, this.world.height, "Atlas", "Cannon001");
        // offset it from position
        this.cannon.anchor.setTo(-0.5, 0.5);
        // make it point straight up
        this.cannon.rotation =  -Math.PI / 2;

        //this.cannon.animations.add("fire", Phaser.Animation.generateFrameNames("Cannon", 1, 5, "", 3));
        this.cannon.animations.add("fire", ["Cannon001", "Cannon002", "Cannon003", "Cannon004", "Cannon005", "Cannon004", "Cannon003", "Cannon002", "Cannon001"]);
        
        // cannon creation
        var pillar1 = this.game.add.sprite(this.world.centerX + 8, this.world.height - 32, "Atlas", "Pillar");

        var pillar2 = this.game.add.sprite(this.world.centerX - 12, this.world.height - 32, "Atlas", "Pillar");

        var base = this.game.add.sprite(this.world.centerX, this.world.height, "Atlas", "Base001");
        base.width = 85;
        base.anchor.setTo(0.5, 1);

        var base2 = this.game.add.sprite(this.world.centerX, this.world.height - 24, "Atlas", "Base001");
        base2.width = 85;
        base2.anchor.setTo(0.5, 1);

        var wall1 = this.game.add.sprite(this.world.centerX + 35, this.world.height, "Atlas", "Base001");
        wall1.width = 32
        wall1.rotation = -Math.PI / 2;

        var wall2 = this.game.add.sprite(this.world.centerX - 45, this.world.height, "Atlas", "Base001");
        wall2.width = 32
        wall2.rotation = -Math.PI / 2;

		//  Game input
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // following keys will not be propagated to browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);

		// allow impact events
        this.game.physics.p2.setImpactEvents(true);

        //  collision groups for balloons`
        this.balloonsCollisionGroup = this.game.physics.p2.createCollisionGroup();
        //  collision groups for balls
        this.ballsCollisionGroup = this.physics.p2.createCollisionGroup();
        // collided collision group 
        this.collidedCollisionGroup = this.physics.p2.createCollisionGroup();
        // wall collision
        this.wallCollisionGroup = this.game.physics.p2.createCollisionGroup();

        // create materials
        
        this.wallMaterial = this.game.physics.p2.createMaterial("wallMaterial");
        this.balloonMaterial = this.game.physics.p2.createMaterial("balloonMaterial");

        this.game.physics.p2.setWorldMaterial(this.wallMaterial, true, true, true, true);
        this.sprite1 = this.game.add.sprite(200, 200, "Atlas", "Base001");
        this.game.physics.p2.enable(this.sprite1);

        this.ballMaterial = this.game.physics.p2.createMaterial("ballMaterial", this.sprite1.body);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        

        // balloons group
        this.balloons = this.add.group();
        this.balloons.physicsBodyType = Phaser.Physics.P2JS;
        this.balloons.enableBody = true;

        // create 10 balloons
        this.balloons.classType = Balloon;
        this.balloons.createMultiple(10, "Atlas", "Balloon001");
        this.balloons.forEach(this.addBalloon, this);

		// balls group
        this.balls = this.add.group();
        this.balls.physicsBodyType = Phaser.Physics.P2JS;
        this.balls.enableBody = true;

        // create initial two balls in cannon
        this.balls.create(this.world.centerX, this.world.height - 16, "Atlas", "Ball00" + this.game.rnd.between(1,4));

        // create intial 20 pool of balls
        for(var i = 1; i < 20; i++) {
            this.balls.create(10, 8 + i * 20, "Atlas", "Ball00" + this.game.rnd.between(1,4));
        }
        this.balls.forEach(this.addBall, this);

       // HWalls group
        this.Hwalls = this.add.group();
        this.Hwalls.physicsBodyType = Phaser.Physics.P2JS;
        this.Hwalls.enableBody = true;
        this.Hwalls.create(this.world.width / 2 + 12, 4, "Atlas", "Base001");
        this.Hwalls.create(this.world.width / 2 + 12, this.world.height - 2, "Atlas", "Base001");

        this.Hwalls.forEach(this.addHWall, this);

        // VWalls group
        this.Vwalls = this.add.group();
        this.Vwalls.physicsBodyType = Phaser.Physics.P2JS;
        this.Vwalls.enableBody = true;
        this.Vwalls.create(24, this.world.height / 2, "Atlas", "Base003");
        this.Vwalls.create(this.world.width - 4, this.world.height / 2, "Atlas", "Base003");

        this.Vwalls.forEach(this.addVWall, this);

        this.scoreLabel = this.game.add.text(26, 3, 'Score: ' + this.score, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });

        // create upNext sprite
        this.selected = this.game.add.sprite(1, 19, "Atlas", "selected");

        // collisionMaterials
        let contactMaterial = this.game.physics.p2.createContactMaterial(this.ballMaterial, this.wallMaterial);

        contactMaterial.friction = 0.3;     // Friction to use in the contact of these two materials.
        contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
        contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
        contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
        //contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
        contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
        contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.         
    
    }

    private addBall(aBall: Phaser.Sprite) {
        aBall.anchor.setTo(0.5, 0.5);
        aBall.rotation = 75;
        
        // physics
        var body: Phaser.Physics.P2.Body = aBall.body;
        body.setMaterial(this.ballMaterial);
        body.setCircle(aBall.width / 2);
        body.setCollisionGroup(this.ballsCollisionGroup);
        body.collides(this.balloonsCollisionGroup);
        //body.collides(this.wallCollisionGroup);
        //body.collides(this.wallCollisionGroup, this.hitWall, this);
        //body.debug = true;
    }

    private addBalloon(aBalloon: Balloon) {
        // setup movements and animations
        aBalloon.setUp();

        // setup physics
        var body: Phaser.Physics.P2.Body = aBalloon.body;
        body.setMaterial(this.balloonMaterial);
        body.setCircle(aBalloon.height / 2);
        body.kinematic = true; // does not respond to forces
        body.setCollisionGroup(this.balloonsCollisionGroup);
        // adds group drones will collide with and callback
        body.collides([this.balloonsCollisionGroup, this.wallCollisionGroup]);
        body.collides(this.ballsCollisionGroup, this.hitBalloon, this);
        //body.debug = true;
    }

    private addHWall(aWall: Phaser.Sprite) {
        aWall.anchor.setTo(0.5, 0.5);
        aWall.scale = new Phaser.Point(8,1);
			
        // physics
        var body: Phaser.Physics.P2.Body = aWall.body;
        body.setMaterial(this.wallMaterial);
        body.setRectangle(aWall.width, aWall.height);
        body.kinematic = true; // does not respond to forces
        body.setCollisionGroup(this.wallCollisionGroup);
        body.collides(this.ballsCollisionGroup);

        //body.collides(this.ballsCollisionGroup, this.hitWall, this);
        //body.collides(this.ballsCollisionGroup,this.hitWall, this);
        //body.debug = true;
    }

    private addVWall(aWall: Phaser.Sprite) {
        aWall.anchor.setTo(0.5, 0.5);
        aWall.scale = new Phaser.Point(1,5.2);
			
        // physics
        var body: Phaser.Physics.P2.Body = aWall.body;
        body.setMaterial(this.wallMaterial);
        body.setRectangle(aWall.width, aWall.height);
        body.kinematic = true; // does not respond to forces
        body.setCollisionGroup(this.wallCollisionGroup);
        body.collides(this.ballsCollisionGroup);


        //body.collides(this.ballsCollisionGroup, this.hitWall, this);
        //body.collides(this.ballsCollisionGroup,this.hitWall, this);
        //body.debug = true;
    }

	update() {
        if (this.cursors.left.isDown)
        {
            this.sprite1.body.moveLeft(200);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite1.body.moveRight(200);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite1.body.moveUp(200);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite1.body.moveDown(200);
        }
        // make keybooard var
        var keyboard: Phaser.Keyboard = this.game.input.keyboard;

        // left and right key
        if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
            // calculate frame independent speed - 45 degrees (PI/4) in 1 second adjusted with cannon speed
            this.cannon.rotation -= this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.cannon.rotation += this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        } else if (this._space.justDown) {  // fire ball
            // get upcoming 3 balls from pool
            var ball: Phaser.Sprite = <Phaser.Sprite>this.balls.getChildAt(this.ballIndex);
            var ballNext: Phaser.Sprite = <Phaser.Sprite>this.balls.getChildAt(this.ballIndex + 1);
            //console.log("[" + this.ballIndex + "]" + "[" + (this.ballIndex + 1) + "]" + "[" + (this.ballIndex + 2) + "]");

            if (ball) {
                // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                this.cannonTip.setTo(this.cannon.width * 1.4, 0);
                this.cannonTip.rotate(0, 0, this.cannon.rotation);
                
                // fire cannon noise and animation
                this.cannon.play("fire", 100, false);
                this.explode.play();

                ball.reset(this.cannon.x + this.cannonTip.x, this.cannon.y + this.cannonTip.y);
                // Q up next balls
                ballNext.reset(this.world.centerX, this.world.height - 16);

                (<Phaser.Physics.P2.Body> ball.body).rotation = this.cannon.rotation;
                // life of ball in millis
                ball.lifespan = 2500;
                // set velocity of ball in direction of cannon barrel
                (<Phaser.Physics.P2.Body> ball.body).velocity.x = this.cannonTip.x * State.BALL_SPEED;
                (<Phaser.Physics.P2.Body> ball.body).velocity.y = this.cannonTip.y * State.BALL_SPEED;

                // create new ball for pool, add to side 
                this.balls.create(10, 8 + (this.ballIndex % 20 ) * 20, "Atlas", "Ball00" + this.game.rnd.between(1,4));
                this.addBall(<Phaser.Sprite>this.balls.getChildAt(this.ballIndex + 20));
                this.ballIndex++;

                // move up selected sprite, loop back to top if at bottom
                this.selected.y += 20;
                if (this.selected.y > 380) {
                    this.selected.y = 0;
                }
            }
        }
        
        // limit cannon rotation to left and right to +/- 45 degrees ... -135 to -45 degrees here
        this.cannon.rotation = Phaser.Math.clamp(this.cannon.rotation, -1.7 * Math.PI / 2, -0.3 * Math.PI / 2);
    }

    // render debug info
    render() {
        //this.game.debug.pointer(this.game.input.pointer1);
        //this.game.debug.pointer(this.game.input.mousePointer);
        //this.game.debug.pointer(this.game.input.pointer2);
        this.balloons.forEach(function (aBalloon: Balloon) {
            this.game.debug.body(aBalloon);
        }, this);

        this.balls.forEach(function (aBall: Phaser.Sprite) {
            this.game.debug.body(aBall);
        }, this); 
    }

    private hitBalloon(aObject1: any, aObject2: any) {
        // explode baloon and remove ball - kill it, not destroy
        if ((<Balloon>aObject1.sprite).alive) {
            let balloonNumber = (<Balloon>aObject1.sprite).frameName.slice(7, 10);
            let ballNumber = (aObject2.sprite).frameName.slice(4, 7);
            let sameVal: Number = balloonNumber.localeCompare(ballNumber);


            console.log((<Balloon>aObject1.sprite).frameName + (aObject2.sprite).frameName);
            console.log(balloonNumber + " " + ballNumber + "Same?:" + (sameVal == 0 ? "Yes": "No") );
            console.log(this.balloons.countLiving() - 1);

            if(sameVal == 0) {
                this.score += 10; 
            } else {
                this.score -= 10;
            }
            this.scoreLabel.text = 'Score: ' + this.score;
            (<Balloon>aObject1.sprite).body.setCollisionGroup(this.collidedCollisionGroup);  
        }
        this.balloonExplode.play();
        (<Balloon> aObject1.sprite).explode();
        (<Phaser.Sprite> aObject2.sprite).kill();
    }

    private hitWall(aObject1: any, aObject2: any) {
        if((aObject2.sprite).x > this.world.width / 2) {
            (aObject2.sprite).body.velocity.x = -1000;
        } else {
            (aObject2.sprite).body.velocity.x = 1000;
        }

        (aObject2.sprite).body.velocity.y = 10;
        //console.log("Wall hit" + (<Balloon>aObject2.sprite).x + "<Balloon Ball>" + (aObject2.sprite).x); 
        //console.log("Wall hit" + (<Balloon>aObject2.sprite).y + "<Balloon Ball>" + (aObject2.sprite).y + "World>" + this.world.width / 2); 

    }
}

class Balloon extends Phaser.Sprite {

    // -------------------------------------------------------------------------
    public setUp() {
        this.anchor.setTo(0.5, 0.5);
		// random position
        this.reset(this.game.rnd.between(80, 600), this.game.rnd.between(60, 150));

        // random movement range
        var range: number = this.game.rnd.between(60, 120);
        // random duration of complete move
        var duration: number = this.game.rnd.between(30000, 50000);
        // random parameters for wiggle easing function
        var xPeriod1: number = this.game.rnd.between(2, 13);
        var xPeriod2: number = this.game.rnd.between(2, 13);
        var yPeriod1: number = this.game.rnd.between(2, 13);
        var yPeriod2: number = this.game.rnd.between(2, 13);

        // set tweens for horizontal and vertical movement
        var xTween = this.game.add.tween(this.body)
        xTween.to({ x: this.position.x + range }, duration, function (aProgress: number) {
            return wiggle(aProgress, xPeriod1, xPeriod2);
        }, true, 0, -1);

        var yTween = this.game.add.tween(this.body)
        yTween.to({ y: this.position.y + range }, duration, function (aProgress: number) {
            return wiggle(aProgress, yPeriod1, yPeriod2);
        }, true, 0, -1);
        var randVal: number = this.game.rnd.between(1, 4);

        this.loadTexture("Atlas", "Balloon00" + randVal);
        //this.animations.add("balloonColor", Phaser.Animation.generateFrameNames("Balloon",randVal, randVal, "", 3), 1, true);
		// define animations
        //this.animations.add("balloonAnim", ["Balloon001", "Balloon002","Balloon003", "Balloon004"], 3, true);
        this.animations.add("explosion", Phaser.Animation.generateFrameNames("Explosion", 1, 6, "", 3));
        
        //set scale
        //this.width = 8;
        //this.height = 10;
        this.scale = new Phaser.Point(.7,.7);

        // play first animation as default
        //this.play("balloonColor");
    }

	// -------------------------------------------------------------------------
    public explode() {
        // remove movement tweens
        this.game.tweens.removeFrom(this.body);
        // explode balloon and kill it on complete
        this.alive = false;
        this.play("explosion", 8, false, true);
    }

}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
function wiggle(aProgress: number, aPeriod1: number, aPeriod2: number): number {
    var current1: number = aProgress * Math.PI * 2 * aPeriod1;
    var current2: number = aProgress * Math.PI * 2 * aPeriod2;

    return Math.sin(current1) * Math.cos(current2);
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
window.onload = () => {
    new Game();
};