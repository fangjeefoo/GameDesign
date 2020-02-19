var MainMenu = {preload: preload, create: create, createButton: createButton};

function preload() {
    game.load.image('button', 'resource/button.png');
    game.load.image('messageBox', 'resource/messageBox.png');
    game.load.image('closeButton', 'resource/closeButton.png');
    game.load.image('background', 'resource/background.png');
}

function create() {
    var bg = game.add.sprite(0, 0, 'background');
    var style = { font: "100px Arial", fill: "#000000", align: "center" };
    var title = game.add.text(game.world.centerX, 100, "Journey", style);
    title.anchor.set(0.5, 0.5);

    bg.width = game.width;
    bg.height = game.height;

    createButton(game.world.centerX, game.world.centerY, "New Game", function () {
        console.log("This function is working");
        game.state.start("Stage1");
    });

    createButton(game.world.centerX, game.world.centerY + 100, "Continue", function () {
            //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 200, "How To Play", function () {
        if (this.msgBox)
            this.msgBox.destroy();

        var style = { font: "25px Arial", fill: "#000000", align: "left" };
        var msgBox = game.add.group();
        var box = game.add.sprite(0, 0, "messageBox");
        var closeButton = game.add.sprite(0, 0, "closeButton");
        var instruction1 = game.add.text(msgBox.x + 20, msgBox.y + 10, "Instruction1", style);
        var instruction2 = game.add.text(msgBox.x + 20, msgBox.y + 30, "Instruction2", style);
        var instruction3 = game.add.text(msgBox.x + 20, msgBox.y + 50, "Instruction3", style);
        var instruction4 = game.add.text(msgBox.x + 20, msgBox.y + 70, "Instruction4", style);
        var instruction5 = game.add.text(msgBox.x + 20, msgBox.y + 90, "Instruction5", style);
        var instruction6 = game.add.text(msgBox.x + 20, msgBox.y + 110, "Instruction6", style);

        box.width = 500;
        box.height = 500;
        closeButton.width = 40;
        closeButton.height = 40;

        msgBox.add(box);
        msgBox.add(instruction1);
        msgBox.add(instruction2);
        msgBox.add(instruction3);
        msgBox.add(instruction4);
        msgBox.add(instruction5);
        msgBox.add(instruction6);
        msgBox.add(closeButton);

        closeButton.x = msgBox.x + 445;
        closeButton.y = msgBox.y + 15;
        msgBox.x = game.width / 2 - msgBox.width / 2;
        msgBox.y = game.height / 2 - msgBox.height / 2;


        closeButton.inputEnabled = true;
        closeButton.events.onInputDown.add(function () {
            msgBox.destroy();
        }, this);

        this.msgBox = msgBox;
    });

    createButton(game.world.centerX, game.world.centerY + 300, "Options", function () {
            //game.state.start();
    });

    createButton(game.world.centerX, game.world.centerY + 300, "Exit", function () {
            //exit the game
    });
}

function createButton(positionX, positionY, text, callback) {
    var button = game.add.button(positionX, positionY, "button", callback, this);
    var style = { font: "30px Arial", fill: "#000000", align: "center" };
    var button_text = game.add.text(button.x, button.y, text, style);
    button.anchor.set(0.5, 0.5);
    button.width = 200;
    button.height = 100;
    button_text.anchor.set(0.5, 0.5);
}



