function start(state, game) {
    game.createWizard(state.wizard);

    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
}



// move wizard
function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    if (state.keys.KeyA && wizard.posX) {
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0)
    }

    if (state.keys.KeyS) {
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height)
    }

    if (state.keys.KeyD) {
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width)
    }

    if (state.keys.KeyW && wizard.posY) {
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0)
    }

    // spawn bugs
    if (timestamp > state.bugStats.nextSpawnTimeStamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimeStamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval
    }


    //render
    wizardElement.style.left = wizard.posX + 'px'
    wizardElement.style.top = wizard.posY + 'px'


    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}