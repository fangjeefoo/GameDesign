var stage1 = {preload:preload, create: create};

function preload() {
    game.load.tilemap('stage1', 'resource/Level1/Stage1.JSON', null, Phaser.Tilemap.TILED_JSON);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.stage.backgroundColor = "#34202B";
    game.stage.backgroundColor = "#FFFFFF";
    bg = game.add.tileSprite(0, 0, 800, 600, 'stage1');
    bg.fixedToCamera = true;
}