var stage1 = { init: init, preload: preload, create: create, update: update };

var map;
var tileset;
var baseLayer;
var layer2;
var coins;
var chest;
var door;
var score;
var life;
var player;
var facing;
var trapTimer;
var cursors;
var style;
var scoreText;
var lifeText;
var onTheGround;
var jumping;
var hard;
var jump;
var game;
var menu;
var pause;
var pressTimer;
var pauseBool;

function init(data) {
    game = data[0];
}

function preload() {
    game.load.image('messageBox', 'resource/messageBox.png');
    game.load.image('closeButton', 'resource/closeButton.png');
    game.load.tilemap('map', 'resource/Level1/Stage1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Assets', 'resource/Level1/Assets.png');
    game.load.spritesheet('hero', 'resource/dude.png', 32, 48);
    game.load.spritesheet('mob', 'resource/droid.png', 32, 32);
    game.load.image('chest', 'resource/chest.png');
    game.load.image('door', 'resource/door.png');
    game.load.image('coins', 'resource/Gold_21.png');
    game.load.image('star', 'resource/star.png');
}

function create() {
    pauseBool = false;
    pressTimer = 0;
    score = 0;
    life = 3;
    trapTimer = 0;
    hard = true;
    jump = 0;
    facing = 'right';

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";

    map = game.add.tilemap("map");
    map.addTilesetImage('Assets');
    map.setCollisionByExclusion([2], true, 'BaseLayer');
    map.setCollisionBetween(0, 1000, true, 'Traps');

    baseLayer = map.createLayer('BaseLayer');
    baseLayer.resizeWorld();

    layer2 = map.createLayer('Traps');
    layer2.resizeWorld();

    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('Coins', 16, 'coins', 0, true, false, coins);

    chest = game.add.group();
    chest.enableBody = true;
    map.createFromObjects('Chest', 85, 'chest', 0, true, false, chest);

    door = game.add.group();
    door.enableBody = true;
    map.createFromObjects('ExitDoor', 1073741856, 'door', 0, true, false, door);

    style = { font: "15px Arial", fill: "#FFFFFF", align: "left" };
    scoreText = game.add.text(0, 0, 'Score: ' + score, style);
    scoreText.fixedToCamera = true;

    lifeText = game.add.text(0, 20, 'Life: ' + life, style);
    lifeText.fixedToCamera = true;

    player = game.add.sprite(50, 500, 'hero');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.gravity.y = 500;
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    menu = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
}

function update() {
    scoreText.setText('Score: ' + score);
    lifeText.setText('Life: ' + life);

    game.physics.arcade.collide(player, baseLayer);
    game.physics.arcade.collide(player, layer2, hurt, null, this);
    game.physics.arcade.collide(coins, baseLayer);    
    game.physics.arcade.collide(player, coins, collectCoin, null, this);
    game.physics.arcade.collide(player, chest, collectChest, null, this);
    game.physics.arcade.collide(player, door, win, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        if (facing != 'idle') {
            player.animations.stop();
            if (facing == 'left') {
                player.frame = 0;
            }
            else {
                player.frame = 5;
            }
            facing = 'idle';
        }
    }

    onTheGound = player.body.onFloor();

    if (onTheGound) {
        jump = 2;
        jumping = false;
    }

    if (jump > 0 && cursors.up.isDown) {
        player.body.velocity.y = -230;
        jumping = true;
        cursors.up.reset(hard);
    }

    if (jumping && !cursors.up.isDown) {
        jump--;
        jumping = false;
    }

    if (menu.isDown)
        menuOption();

    if (pause.isDown)
        enableKey(false);
}

function collectCoin(player, coin) {
    coin.kill();
    score++;
}

function hurt(player, trap) {
    if(game.time.now > trapTimer)
        life--;

    if (life == 0)
       game.state.start("Lose", true, true, [game]);

   trapTimer = game.time.now + 750;
}

function collectChest(player, chest) {
    chest.kill();
    score = score + 10;
}

function win() {
    game.state.start('Stage2', true, true, [game,score,life]);
}

function menuOption() {
    enableKey(true);

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
    msgBox.x = 600 / 2 - msgBox.width / 2;
    msgBox.y = 300 / 2 - msgBox.height / 2;
    msgBox.fixedToCamera = true;

    closeButton.inputEnabled = true;
    closeButton.events.onInputDown.add(function () {
        enableKey(true);
        msgBox.destroy();
    }, this);

    this.msgBox = msgBox;
}

function enableKey(isMenu) {
    if (game.time.now > pressTimer) {
        pressTimer = game.time.now + 1000;
        if (!pauseBool){
            cursors.left.enabled = false;
            cursors.right.enabled = false;
            cursors.up.enabled = false;
            pauseBool = true;
        }
        else {
            cursors.left.enabled = true;
            cursors.right.enabled = true;
            cursors.up.enabled = true;
            pauseBool = false;
        }

        if (isMenu) {
            if (!pauseBool) {
                pause.enabled = false;
                pauseBool = true;
            }
            else {
                pause.enabled = true;
                pauseBool = false;
            }
        }
    }
}