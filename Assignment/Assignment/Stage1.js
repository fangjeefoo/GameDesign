var stage1 = {preload:preload, create: create};

function preload() {
    game.load.tilemap('stage1', 'Stage1.JSON', null, Phaser.Tilemap.TILED_JSON);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#34202B";
    var map = game.add.tilemap("stage1");
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
}