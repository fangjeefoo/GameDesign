var menu = {preload: preload, create: create};

function preload() {
    game.load.image('messageBox', 'resource/messageBox.png');
    game.load.image('closeButton', 'resource/closeButton.png');
    game.load.image('background', 'resource/background.png');
}

function create() {
    var bg = game.add.sprite(0, 0, 'background');
    var style = { font: "100px Arial", fill: "#000000", align: "center" };
    var title = game.add.text(game.world.centerX, 100, "Journey", style);
    var newGameButton;
    var continueButton;
    var instructionButton;
    var optionButton;
    var quitButton;
    title.anchor.set(0.5, 0.5);

    bg.width = game.width;
    bg.height = game.height;

    newGameButton = createButton(game.world.centerX, game.world.centerY - 100, "New Game", function () {
        game.state.start("Stage1");
    });

    continueButton = createButton(game.world.centerX, game.world.centerY, "Continue", function () {
        //game.state.start();
    });

    instructionButton = createButton(game.world.centerX, game.world.centerY + 100, "How To Play", function () {
        if (this.msgBox)
            this.msgBox.destroy();

        var style = { font: "25px Arial", fill: "#000000", align: "left" };
        var msgBox = game.add.group();
        var box = game.add.sprite(0, 0, "messageBox");
        var closeButton = game.add.sprite(0, 0, "closeButton");
        var instruction = game.add.text(0, msgBox.y + 10, "Control", style);
        var instruction1 = game.add.text(msgBox.x + 20, msgBox.y + 40, "Arrow Up - Jump", style);
        var instruction2 = game.add.text(msgBox.x + 20, msgBox.y + 70, "Arrow Down - Duck", style);
        var instruction3 = game.add.text(msgBox.x + 20, msgBox.y + 100, "Arrow Right - Move right", style);
        var instruction4 = game.add.text(msgBox.x + 20, msgBox.y + 130, "Arrow Left - Move left", style);
        var instruction5 = game.add.text(msgBox.x + 20, msgBox.y + 160, "ESC - Menu", style);
        var instruction6 = game.add.text(msgBox.x + 20, msgBox.y + 190, "C - Interact", style);
        var instruction7 = game.add.text(msgBox.x + 20, msgBox.y + 210, "X - Push", style);
        var instruction8 = game.add.text(msgBox.x + 20, msgBox.y + 240, "Z - Pull", style);
        var instruction9 = game.add.text(msgBox.x + 20, msgBox.y + 270, "P - Pause / Unpause", style);

        newGameButton.inputEnabled = false;
        continueButton.inputEnabled = false;
        instructionButton.inputEnabled = false;
        optionButton.inputEnabled = false;
        quitButton.inputEnabled = false;

        box.width = 500;
        box.height = 500;
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
        msgBox.add(instruction7);
        msgBox.add(instruction8);
        msgBox.add(instruction9);
        msgBox.add(closeButton);

        closeButton.x = msgBox.x + 445;
        closeButton.y = msgBox.y + 15;
        instruction.x = msgBox.width / 2 - instruction.width / 2;
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;
        
        closeButton.inputEnabled = true;
        closeButton.events.onInputDown.add(function () {
            newGameButton.inputEnabled = true;
            continueButton.inputEnabled = true;
            instructionButton.inputEnabled = true;
            optionButton.inputEnabled = true;
            quitButton.inputEnabled = true;
            msgBox.destroy();
        }, this);

        this.msgBox = msgBox;
    });

    optionButton = createButton(game.world.centerX, game.world.centerY + 200, "Options", function () {
        //game.state.start();
    });

    quitButton = createButton(game.world.centerX, game.world.centerY + 300, "Exit", function () {
       //exit the game
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

    return button;
}