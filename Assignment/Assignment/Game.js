var game = new Phaser.Game(600, 300, Phaser.CANVAS, 'phaser-example');

game.state.add('Menu', menu);
game.state.add('Stage1', stage1);
game.state.add('Stage2', stage2);

game.state.start('Menu');