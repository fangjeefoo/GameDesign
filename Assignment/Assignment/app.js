var game = new Phaser.Game("100", "100", Phaser.AUTO, "content", { preload: preload, create: create });
function preload() {
    game.load.image('button', 'button.png');
}
function create() {
    createButton(game.world.centerX, game.world.centerY, "Start", function () {
        //game.state.start();
    });
    createButton(game.world.centerX, game.world.centerY + 100, "Continue", function () {
        //game.state.start();
    });
    createButton(game.world.centerX, game.world.centerY + 200, "Setting", function () {
        //game.state.start();
    });
    createButton(game.world.centerX, game.world.centerY + 300, "Quit", function () {
        //game.state.start();
    });
}
function createButton(positionX, positionY, text, callback) {
    var button = game.add.button(positionX, positionY, "button", callback, this);
    var style = { font: "30px Arial", fill: "#000000", align: "center" };
    var button_text = game.add.text(button.x, button.y, text, style);
    button.anchor.set(0.5, 0.5);
    button.width = 100;
    button.height = 100;
    button_text.anchor.set(0.5, 0.5);
}
//# sourceMappingURL=app.js.map