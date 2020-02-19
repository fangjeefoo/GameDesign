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
    game.load.spritesheet('hero', 'resource/Level1/dude.png', 32, 48);
    game.load.spritesheet('mob', 'resource/Level1/droid.png', 32, 32);
    game.load.image('star', 'resource/Level1/star.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";
    map = game.add.tilemap("level1");
    map.addTilesetImage('Assets');
    layer = map.createLayer('BaseLayer');
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