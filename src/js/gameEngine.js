function start(state, game) {
    game.createWizard(state.wizard);

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}



// move wizard
function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;


    game.scoreEl.textContent = `Score:  ${state.score} pts.`

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
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")';

        if (timestamp > state.fireball.spawnTimestamp) {
            game.createFireball(wizard, state.fireball);
            state.fireball.spawnTimestamp = timestamp + state.fireball.fireRate
        }


    } else {
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")'
    }



    // spawn bugs
    if (timestamp > state.bugStats.nextSpawnTimeStamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimeStamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval
    }

    //render bugs
    let bugElements = document.querySelectorAll('.bug')
    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left);

        //detect collision with wizzard
        if (detectCollision(wizardElement, bug)) {
            state.gameOver = true;
        }

        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px'
        } else {
            bug.remove()
        }

    })

    //render fireballs
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        //detect collision
        bugElements.forEach(bug => {
            if (detectCollision(bug, fireball)) {
                state.score += state.killScore
                bug.remove();
                fireball.remove();
            }
        })

        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove()
        } else {
            fireball.style.left = posX + state.fireball.speed + 'px'
        }


    })

    //render wizard
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';

    if (state.gameOver) {
        alert('GAME OVER');
    } else {
        state.score += 1;
        window.requestAnimationFrame(gameLoop.bind(null, state, game))
    }




}

function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right)

    return hasCollision
}