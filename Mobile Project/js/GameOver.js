Game.GameOver = function(game){

};

var titlescreen;
var score1;
var scoreText;
Game.GameOver.prototype = {

    init:function(game){
        score1 = score;
    },

    create:function(game){

        titlescreen = game.add.sprite(400, 300, 'gameover');
        titlescreen.anchor.setTo(0.5, 0.5);

        this.createButton(game, "Play Again", 220, 500, 300, 100, function(){
            this.state.start('Level1');
        });

        scoreText = game.add.text(500, 500, 'Score: ', {font: '30px Arial', fill:'#fff'});
        scoreText.text = "Final Score: "+ score1;

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
