﻿var stage2 = { preload: preload, create: create, update: update };

var map;
var tileset;
var baseLayer;
var trap;
var coins;
var chest;
var door;
var score;
var life;
var player;
var facing = 'right';
var cursors;
var style;
var scoreText;
var lifeText;
var onTheGround;
var jumping;
var hard = true;
var jump = 0;

function preload() {
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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";

    map = game.add.tilemap("map");
    map.addTilesetImage('Assets');
    map.setCollisionByExclusion([1, 2]);
    map.setCollisionBetween(1, 1000, true, 'Traps');

    baseLayer = map.createLayer('BaseLayer');
    baseLayer.resizeWorld();

    trap = map.createLayer('Traps');
    trap.resizeWorld();

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

    player = game.add.sprite(50, 330, 'hero');
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
}

function update() {
    scoreText.setText('Score: ' + score);
    lifeText.setText('Life: ' + life);
    
    game.physics.arcade.collide(player, baseLayer);
    game.physics.arcade.collide(player, trap, hurt, null, this);
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
        player.body.velocity.y = -190;
        jumping = true;
        cursors.up.reset(hard);
    }

    if (jumping && !cursors.up.isDown) {
        jump--;
        jumping = false;
    }
}

function collectCoin(player, coin) {
    coin.kill();
    score++;
}

function hurt(player, trap) {
    life--;
    //if (life == 0)
       // game.state.start("Lose");
}

function collectChest(player, chest) {
    chest.kill();
    score = score + 10;
}

function win() {
    game.state.start('Win');
}