var win = { create: create }
var style = { font: "25px Arial", fill: "#FFFFFF", align: "left" };

function create() {
    game.stage.background = '#000000';
    game.add.text(game.worldCenterX, game.worldCenterY, "You Win!", style);
    // game.state.start('Menu');
}