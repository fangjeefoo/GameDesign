var stage1 = { preload: preload, create: create, update: update };

var map;
var tileset;
var baseLayer;
var baseLayer2;
var trap;
var player;
var facing = 'right';
var jumpTimer = 0;
var cursors;
var jumpButton;


function preload() {
    game.load.tilemap('level1', 'resource/Level1/Stage1Proto.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Assets', 'resource/Level1/Assets.png');
    game.load.spritesheet('hero', 'resource/dude.png', 32, 48);
    game.load.spritesheet('mob', 'resource/droid.png', 32, 32);
    game.load.image('star', 'resource/star.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";
    map = game.add.tilemap("level1");
    map.addTilesetImage('Assets');
    baseLayer = map.createLayer('BaseLayer');
    baseLayer.resizeWorld();
    //baseLayer2 = map.createLayer('StartEnd');
    //baseLayer2.resizeWorld();
   // trap = map.createLayer('Trap');
   // trap.resizeWorld();

    game.physics.arcade.gravity.y = 500;
    player = game.add.sprite(30, 200, 'hero');
    game.physics.enable(player, Phaser.Physics.ARCADE);
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
   // game.physics.arcade.collide(player, baseLayer2);
   // game.physics.arcade.collide(player, trap);
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