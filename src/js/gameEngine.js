function start(state, game) {
    game.createWizard(state.wizard);

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}



// move wizard
function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    // wizad movement
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

    // make wizard throw fireball
    if (state.keys.Space) {
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")'

        game.createFireball(wizard, state.fireball);
    } else {
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")'
    }

    // spawn bugs
    if (timestamp > state.bugStats.nextSpawnTimeStamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimeStamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval
    }

    //render bugs
    document.querySelectorAll('.bug').forEach(bug => {
        let posX = parseInt(bug.style.left);

        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px'
        } else {
            bug.remove()
        }

    })

    //render fireballs
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        fireball.style.left = posX + state.fireball.speed + 'px'
    })

    //render
    wizardElement.style.left = wizard.posX + 'px'
    wizardElement.style.top = wizard.posY + 'px'



    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}