var stage1 = {preload:preload, create: create};
var map;
var layer;

function preload() {
    game.load.tilemap('map', 'resource/Level1/Stage1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Assets', 'resource/Level1/Assets.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";
    map = game.add.tilemap('map');
    map.addTilesetImage('Assets');
    layer = map.createLayer('BaseLayer');
    layer.resizeWorld();
}