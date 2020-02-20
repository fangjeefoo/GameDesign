var stage1 = { preload: preload, create: create };
var map;
var tileset;
var layer;
var player;
var facing = 'left';
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
    layer = map.createLayer('BaseLayer');
    layer.resizeWorld();
    layer = map.createLayer('BaseLayer2');
    layer.resizeWorld();
    layer = map.createLayer('Trap');
    layer.resizeWorld();

    game.physics.arcade.gravity.y = 500;
    player = game.add.sprite(32, 48, 'hero');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.animation.add('left', [0, 1, 2, 3], 10, true);
    player.animation.add('idle', [4], 20, true);
    player.animation.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors.game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.arcade.collide(player, layer);
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
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
}