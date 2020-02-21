var win = { create: create }


function create() {
    var style = { font: "25px Arial", fill: "#FFFFFF", align: "left" };
    var text = game.add.text(game.world.centerX, game.world.centerY, "You Win!", style);
    text.anchor.set(0.5, 0.5);
    game.stage.background = '#000000';
    // game.state.start('Menu');
}