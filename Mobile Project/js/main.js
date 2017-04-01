window.onload = function(){
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Level1', Game.Level1);
    game.state.add('Infinite1', Game.Infinite1);
    game.state.add('GameOver', Game.GameOver);

    game.state.start('Boot');

}
