var stage2 = { init: init, preload: preload, create: create, update: update };

var map;
var tileset;
var baseLayer;
var trap;
var coins;
var chest;
var door;
var hiddenBlock;
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
var shootKey;
var stars;
var starTime;
var nextFire;
var enemy;
var game;
var menu;
var pause;
var pressTimer;
var pauseBool;
var tempScore;
var tempLife;
var speed;

function init(data, file, playerPosX, playerPosY, life, score) {
    if (file) {
        array = new Array(4);
        this.game = game;
        array[0] = playerPosX;
        array[1] = playerPosY;
        array[2] = life;
        array[3] = score;
    }
    else {
        array = null;
        game = data;
        this.score = score;
        this.life = life;
        tempLife = life;
        tempScore = score;
    }
}

function preload() {
    game.load.image('messageBox', 'resource/messageBox.png');
    game.load.image('closeButton', 'resource/closeButton.png');
    game.load.tilemap('map', 'resource/Level2/Stage2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Assets', 'resource/Level2/Assets.png');
    game.load.spritesheet('hero', 'resource/dude.png', 32, 48);
    game.load.spritesheet('mob', 'resource/droid.png', 32, 32);
    game.load.image('chest', 'resource/chest.png');
    game.load.image('door', 'resource/door.png');
    game.load.image('coins', 'resource/Gold_21.png');
    game.load.image('star', 'resource/star.png');
}

function create() {
    speed = 50;
    tempLife = life;
    tempScore = score;
    pauseBool = false;
    pressTimer = 0;
    starTime = 0;
    nextFire = 0;
    trapTimer = 0;
    hard = true;
    jump = 0;
    facing = 'right';

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";

    map = game.add.tilemap("map");
    map.addTilesetImage('Assets');
    map.setCollisionByExclusion([1, 2], true, 'BaseLayer');
    map.setCollisionBetween(1, 1000, true, 'Traps');
    map.setCollisionBetween(1, 1000, true, 'hiddenBlock');

    baseLayer = map.createLayer('BaseLayer');
    baseLayer.resizeWorld();

    trap = map.createLayer('Traps');
    trap.resizeWorld();

    hiddenBlock = map.createLayer('hiddenBlock');
    hiddenBlock.resizeWorld();

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

    if (array !== null)
        player = game.add.sprite(array[0] - 5, array[1] - 5, 'hero');
    else
        player = game.add.sprite(30, 50, 'hero');

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.gravity.y = 500;
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(player);

    enemy = game.add.group();
    enemy.enableBody = true;

    for (var i = 2; i < 4; i++)
        var enemies = enemy.create(i * 100, 165, 'mob'); //165, 300, 230, 550

    var enemies = enemy.create(2 * 20, 230, 'mob'); //165, 300, 230, 550
    var enemies = enemy.create(3 * 100, 230, 'mob'); //165, 300, 230, 550
    var enemies = enemy.create(2 * 100, 300, 'mob'); //165, 300, 230, 550

    for (var i = 2; i < 4; i++)
        var enemies = enemy.create(i * 100, 550, 'mob'); //165, 300, 230, 550

    enemy.setAll('body.gravity.y', 500);
    enemy.setAll('body.velocity.x', speed);

    stars = game.add.group();
    stars.enableBody = true;
    stars.physicalBodyType = Phaser.Physics.ARCADE;
    stars.createMultiple(50, 'star');
    stars.setAll('checkWorldBounds', true);
    stars.setAll('outOfBoundsKill', true);						 

    cursors = game.input.keyboard.createCursorKeys();
    shootKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    menu = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
}

function update() {
    scoreText.setText('Score: ' + score);
    lifeText.setText('Life: ' + life);
    
    game.physics.arcade.collide(player, baseLayer);
    game.physics.arcade.collide(coins, baseLayer);
    game.physics.arcade.collide(enemy, baseLayer);
    game.physics.arcade.collide(enemy, hiddenBlock, checkBound, null, this);
    game.physics.arcade.collide(player, trap, hurt, null, this);
    game.physics.arcade.collide(player, enemy, hurt2, null, this);
    game.physics.arcade.collide(stars, enemy, dead, null, this);
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

    if (shootKey.isDown) {
    	fire();
    }

    if (menu.isDown)
        menuOption();

    if (pause.isDown)
        enableKey(false);
}

function collectCoin(player, coin) {
    coin.kill();
    score = score + 5;
}

function hurt2(player, enemy) {
    if (game.time.now > trapTimer)
        life--;

    if (life == 0) 
        game.state.start("Lose", true, true, game);

    trapTimer = game.time.now + 750;
}

function hurt(player, trap) {
    if (game.time.now > trapTimer)
        life--;

    if (life == 0) 
        game.state.start("Lose", true, true, game);     
    
    trapTimer = game.time.now + 750;
}

function collectChest(player, chest) {
    chest.kill();
    score = score + 25;
}

function win() {
    game.state.start('Win', true, true, game);
}

function dead(stars, enemy) {
	stars.kill();
	enemy.destroy();
	score += 15;
}

function fire() {
    if (game.time.now > starTime) {
        var star = stars.getFirstExists(false);

        if (star) {
            star.reset(player.x, player.y + 20);
            if (facing != 'left') {
                star.body.velocity.x = 400;
                facing = 'left';
            }
            else if (facing != 'right') {
                star.body.velocity.x = -400;
                facing = 'right';
            }

            starTime = game.time.now + 200;
        }
    }
}

function enableKey(isMenu) {
    if (game.time.now > pressTimer) {
        pressTimer = game.time.now + 1000;
        if (!pauseBool) {
            cursors.left.enabled = false;
            cursors.right.enabled = false;
            cursors.up.enabled = false;
            if (isMenu)
                pause.enabled = false;
            pauseBool = true;
        }
        else {
            cursors.left.enabled = true;
            cursors.right.enabled = true;
            cursors.up.enabled = true;
            if (isMenu)
                pause.enabled = true;
            pauseBool = false;
        }
    }
}

function menuOption() {
    enableKey(true);

    if (this.msgBox)
        this.msgBox.destroy();

    var style = { font: "25px Arial", fill: "#000000", align: "left" };
    var msgBox = game.add.group();
    var box = game.add.sprite(0, 0, "messageBox");
    var closeButton = game.add.sprite(0, 0, "closeButton");
    var instruction = game.add.text(50, msgBox.y + 30, "Menu", style);

    box.width = 430;
    box.height = 250;
    closeButton.width = 40;
    closeButton.height = 40;

    msgBox.add(box);
    msgBox.add(instruction);
    msgBox.add(closeButton);
    msgBox.add(myButton(game.width / 2, game.height / 2 - 50, "Main Menu", function () {
        game.state.start('Menu', true, true, [game]);
    }, msgBox));
    msgBox.add(myButton(game.width / 2, game.height / 2, "Score Board", function () {
        game.state.start('ScoreBoard', true, true, [game]);
    }, msgBox));
    msgBox.add(myButton(game.width / 2, game.height / 2 + 50, "Restart", function () {
        game.state.restart(true, true, game, false, null, null, null, null);
    }, msgBox));
    msgBox.add(myButton(game.width / 2, game.height / 2 + 100, "Save Game", function () {
        saveFile();
    }, msgBox));

    closeButton.x = box.x + 470;
    closeButton.y = box.y + 30;
    instruction.x = game.width / 2 - instruction.width / 2;
    box.x = game.width / 2 - box.width / 2;
    box.y = game.height / 2 - box.height / 2;

    instruction.fixedToCamera = true;
    closeButton.fixedToCamera = true;
    box.fixedToCamera = true;

    closeButton.inputEnabled = true;
    closeButton.events.onInputDown.add(function () {
        enableKey(true);
        msgBox.destroy();
    }, this);
    this.msgBox = msgBox;
}

function myButton(positionX, positionY, text, callback, msgBox) {
    var button = game.add.button(positionX, positionY, "", callback, this);
    var style = { font: "25px Arial", fill: "#000000", align: "center" };
    var button_text = game.add.text(button.x, button.y, text, style);

    button.fixedToCamera = true;
    button_text.fixedToCamera = true;
    msgBox.add(button);
    msgBox.add(button_text);

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

function checkBound(e, block) {
    speed = speed * -1;
    enemy.set(e,'body.velocity.x', speed);
}

function saveFile() {
    var file = {
        playerPosX: player.body.x,
        playerPosY: player.body.y,
        level: 2,
        score: score,
        life: life
    };
    localStorage.setItem('SaveFile', JSON.stringify(file));
}