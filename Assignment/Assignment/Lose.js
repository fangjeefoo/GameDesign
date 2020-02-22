var lose = {init: init, create: create }
var game;

function init(data) {
    game = data[0];
}

function create() {
    var style = { font: "25px Arial", fill: "#000000", align: "center" };
    var text = game.add.text(300, 150, "You Lose!", style);

    text.anchor.set(0.5, 0.5);
    game.stage.backgroundColor = "#FFFFFF";

    createButton(300, 200, 'OK', function () {
        game.state.start('ScoreBoard', true, true, [game]);
    });
}

function createButton(positionX, positionY, text, callback) {
    var button = game.add.button(positionX, positionY, "", callback, this);
    var style = { font: "30px Arial", fill: "#000000", align: "center" };
    var button_text = game.add.text(button.x, button.y, text, style);

    button.anchor.set(0.5, 0.5);
    button.width = 200;
    button.height = 50;
    button_text.anchor.set(0.5, 0.5);

    button.onInputOver.add(function () {
        button_text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    }, this);

    button.onInputOut.add(function () {
        button_text.setShadow();
    }, this);

    return button;
}