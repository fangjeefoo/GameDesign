var game = new Phaser.Game("100", "100", Phaser.AUTO, "content", { preload: preload, create: create });

function preload() {
    game.load.image('button', 'resource/button.png');
}

function create() {
    var style = { font: "100px Arial", fill: "#FFFFFF", align: "center" };
    var title = game.add.text(game.world.centerX, 100, "Journey", style);

    createButton(game.world.centerX, game.world.centerY, "New Game", function () {
        //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 100, "Continue", function () {
        //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 200, "How To Play", function () {
        //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 200, "Options", function () {
        //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 300, "Exit", function () {
       //exit the game
    });
}

function createButton(positionX, positionY, text, callback) {
    var button = game.add.button(positionX, positionY, "button", callback, this);
    var style = {font: "30px Arial", fill: "#000000", align: "center"};
    var button_text = game.add.text(button.x, button.y, text, style);
    button.anchor.set(0.5, 0.5);
    button.width = 100;
    button.height = 100;
    button_text.anchor.set(0.5, 0.5);
}


