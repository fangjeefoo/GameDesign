var scoreBoard = { preload: preload, create: create };

var name = "TestPlayer";
var score = 0;
var coor;

function init(data) {
	game = data;
}

function preload() {
	game.load.text('scoreRecord', 'scoreRecord.txt');
	game.load.image('messageBox', 'resource/messageBox.png');
	game.load.image('closeButton', 'resource/closeButton.png');
	game.load.image('background', 'resource/background.png');
}

function create() {
    coor = 0;
    game.world.height = 300;
    game.world.width = 600;

	var bg = game.add.sprite(0, 0, 'background');
	bg.width = game.width;
	bg.height = game.height;

	var style = { font: "25px Arial", fill: "#111111", align: "left" };
	var title = game.add.text(175, 25, "Past Scores", style);
	title.anchor.set(0.5, 0.5);

	if (this.msgBox)
		this.msgBox.destroy();
	var msgBox = game.add.group();
	var box = game.add.sprite(0, 0, "messageBox");
	var closeButton = game.add.sprite(570, 0, "closeButton");

	msgBox.add(box);
	var styleScore = { font: "20px Arial", fill: "#111111", align: "right" };
	var scoreRec = game.cache.getText('scoreRecord');
	textRec = scoreRec.split('\r\n');

	for (var i = 0; i < 10; i++) {
		if (i == 9) {
			var instruction = game.add.text(180, 45 + coor, "\t\t\t" + name + "\t\t\t\t\t\t\t\t\t" + score, styleScore);
		} else {
			var instruction = game.add.text(180, 45 + coor, "\t\t\t" + textRec[i], styleScore);
			msgBox.add(instruction);
			coor = coor + 23;
		}
	}

	box.width = 405;
	box.height = 250;
	box.x = 83;
	box.y = 38;


	closeButton.width = 23;
	closeButton.height = 23;
	closeButton.x = msgBox.x + 580;
	closeButton.y = msgBox.y;
	closeButton.inputEnabled = true;
	closeButton.events.onInputDown.add(function () {
		game.state.start('Menu', true, true, game);
		msgBox.destroy();
	}, this);
}

