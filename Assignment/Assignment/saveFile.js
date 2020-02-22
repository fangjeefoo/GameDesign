function saveFile() {
    var file = {
        playerPosX: player.body.x,
        playerPosY: player.body.y,
        level: level,
        enemy: enemy,
        chest: chest,
        coin: coin,
        score: score,
        life: life
    };
    localStorage.setItem('SavaFile', file);
}