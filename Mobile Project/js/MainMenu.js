Game.MainMenu = function(game){

};

var titlescreen;
var bgmusic;
Game.MainMenu.prototype = {

    create:function(game){

        bgmusic = game.add.audio('BGMusic');
        bgmusic.play();
        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'splash');
        titlescreen.anchor.setTo(0.5, 0.5);

        this.createButton(game, "Play", game.world.centerX, game.world.centerY+150, 300, 100, function(){
            this.state.start('Level1');
        });


    },

    update:function(game){

    },

    createButton:function(game,string, x, y, w, h, callback){
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);

        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var text = game.add.text(button1.x, button1.y, string, {font:"14px Arial", fill:"#ffffff", align:"center"});
        text.anchor.setTo(0.5, 0.5);
    }

};
