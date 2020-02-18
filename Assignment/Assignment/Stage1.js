var game = new Phaser.Game("100", "100", Phaser.AUTO, "content", { preload: preload, create: create }, true);

function preload() {
    game.load.tilemap('stage1', 'resource/Level1/Stage1.JSON', null, Phaser.Tilemap.TILED_JSON);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bg = game.add.tileSprite(0, 0, 800, 600, 'stage1');
    bg.fixedToCamera = true;
}