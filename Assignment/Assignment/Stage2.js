var stage2 = { preload: preload, create: create, update: update };

var map;
var tileset;
var baseLayer;
var trap;
var coins;
var chest;
var door;
var score = 0;
var life = 3;
var player;
var facing = 'right';
var jumpTimer = 0;
var cursors;
var style = { font: "25px Arial", fill: "#000000", align: "left" };

function preload() {
    game.load.tilemap('map', 'resource/Level2/Stage2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Assets', 'resource/Level2/Assets.png');
    game.load.spritesheet('hero', 'resource/dude.png', 32, 48);
    game.load.spritesheet('mob', 'resource/droid.png', 32, 32);
    game.load.spritesheet('chest', 'resource/chest.png', 18, 24);
    game.load.image('door', 'resource/door.png');
    game.load.image('coins', 'resource/Gold_21.png');
    game.load.image('star', 'resource/star.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.text(0, 0, 'Score: ' + score, style);
    game.stage.backgroundColor = "#34202B";

    map = game.add.tilemap("map");
    map.addTilesetImage('Assets');
    map.setCollisionByExclusion([1, 2]);

    baseLayer = map.createLayer('BaseLayer');
    baseLayer.resizeWorld();

    trap = map.createLayer('Traps');
    trap.resizeWorld();

    coins = game.add.group();
    coins.enableBody = true;
    map.createFromObjects('Coins', 16, 'coins', 0, true, false, coins);

    chest = game.add.group();
    chest.enableBody = true;
    map.createFromObjects('Chest', [85, 131], 'chest', 0, true, false, chest);
    //chest.setAll('animations.add', 'animations', 'normal', [0]);
    //chest.setAll('animations.add', 'animations', 'open', [1, 2, 3]);

    map.createFromObjects('ExitDoor', [1073741879, 32, 1073741856], 'door', 0, true, false, door);

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
    game.physics.arcade.collide(player, baseLayer);
    game.physics.arcade.collide(coins, baseLayer);
    game.physics.arcade.overlap(player, trap, hurt, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);
    game.physics.arcade.overlap(player, chest, collectChest, null, this);
    game.physics.arcade.overlap(player, door, win, null, this);

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
    else if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
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
}

function collectCoin(player, coin) {
    coin.kill();
    score++;
}

function hurt(player, trap) {
    life--;

}

function collectChest(player, chest) {
    chest.kill();
    score = score + 10;
}

function win() {
    //game.state.start('Stage2');
}