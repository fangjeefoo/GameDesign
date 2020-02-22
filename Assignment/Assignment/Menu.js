var menu = { preload: preload, create: create };

function preload() {
    game.load.image('messageBox', 'resource/messageBox.png');
    game.load.image('closeButton', 'resource/closeButton.png');
    game.load.image('background', 'resource/background.png');
}

function create() {
    var bg = game.add.sprite(0, 0, 'background');
    var style = { font: "100px Arial", fill: "#000000", align: "center" };
    var title = game.add.text(game.world.centerX, 70, "Journey", style);
    var newGameButton;
    var continueButton;
    var instructionButton;
    var scoreButton;
    title.anchor.set(0.5, 0.5);

    bg.width = game.width;
    bg.height = game.height;

    newGameButton = createButton(game.world.centerX, game.world.centerY, "New Game", function () {
        game.state.start('Stage1');
    });

    continueButton = createButton(game.world.centerX, game.world.centerY + 35, "Continue", function () {
        //game.state.start();
    });

    instructionButton = createButton(game.world.centerX, game.world.centerY + 70, "How To Play", function () {
        if (this.msgBox)
            this.msgBox.destroy();

        var style = { font: "25px Arial", fill: "#000000", align: "left" };
        var msgBox = game.add.group();
        var box = game.add.sprite(0, 0, "messageBox");
        var closeButton = game.add.sprite(0, 0, "closeButton");
        var instruction = game.add.text(50, msgBox.y + 10, "Control", style);
        var instruction1 = game.add.text(msgBox.x + 80, msgBox.y + 50, "Arrow Up - Jump", style);
        var instruction2 = game.add.text(msgBox.x + 80, msgBox.y + 80, "Arrow Right - Move right", style);
        var instruction3 = game.add.text(msgBox.x + 80, msgBox.y + 110, "Arrow Left - Move left", style);
        var instruction4 = game.add.text(msgBox.x + 80, msgBox.y + 140, "Spacebar - Shoot", style);
        var instruction5 = game.add.text(msgBox.x + 80, msgBox.y + 170, "ESC - Menu", style);
        var instruction6 = game.add.text(msgBox.x + 80, msgBox.y + 200, "P - Pause / Unpause", style);

        newGameButton.inputEnabled = false;
        continueButton.inputEnabled = false;
        instructionButton.inputEnabled = false;

        box.width = 430;
        box.height = 250;
        box.x = 15;
        box.y = 0;
        closeButton.width = 40;
        closeButton.height = 40;

        msgBox.add(box);
        msgBox.add(instruction);
        msgBox.add(instruction1);
        msgBox.add(instruction2);
        msgBox.add(instruction3);
        msgBox.add(instruction4);
        msgBox.add(instruction5);
        msgBox.add(instruction6);
        msgBox.add(closeButton);

        closeButton.x = msgBox.x + 400;
        closeButton.y = msgBox.y + 5;
        instruction.x = msgBox.width / 2 - instruction.width / 2;
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;

        closeButton.inputEnabled = true;
        closeButton.events.onInputDown.add(function () {
            newGameButton.inputEnabled = true;
            continueButton.inputEnabled = true;
            instructionButton.inputEnabled = true;
            msgBox.destroy();
        }, this);

        this.msgBox = msgBox;
    });

    scoreButton = createButton(game.world.centerX, game.world.centerY + 105, "Score Board", function () {
        game.state.start('ScoreBoard');
    });
}

function createButton(positionX, positionY, text, callback) {
    var button = game.add.button(positionX, positionY, "", callback, this);
    var style = { font: "30px Arial", fill: "#000000", align: "center" };
    var button_text = game.add.text(button.x, button.y, text, style);

    button.anchor.set(0.5, 0.5);
    button.width = 200;
    button.height = 100;
    button_text.anchor.set(0.5, 0.5);

    button.onInputOver.add(function () {
        button_text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    }, this);

    button.onInputOut.add(function () {
        button_text.setShadow();
    }, this);

    return button;
}