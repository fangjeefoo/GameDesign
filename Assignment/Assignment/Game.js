var game = new Phaser.Game('100', '100', Phaser.AUTO, "content", true);

game.state.add('Menu', menu);
game.state.add('Stage1', stage1);
//game.state.add('Stage2', stage2);

game.state.start('Menu');