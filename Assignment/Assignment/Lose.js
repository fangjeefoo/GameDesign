var lose = {create: create}
var style = { font: "25px Arial", fill: "#000000", align: "left" };

function create() {
    game.stage.background = '#FFFFFF';
    game.add.text(game.worldCenterX, game.worldCenterY, "You Lose!", style);
   // game.state.start('Menu');
}