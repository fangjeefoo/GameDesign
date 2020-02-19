window.onload = function () {
    var game = new Phaser.Game('100', '100', Phaser.AUTO, 'content');
    var MainMenu;
    game.state.add('MainMenu', MainMenu);
    game.state.start("MainMenu");
};
//# sourceMappingURL=app.js.map