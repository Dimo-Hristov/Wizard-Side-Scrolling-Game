let state = initState();
let game = initGameObjects();

const availableKeys = ['keyA', 'keyS', 'keyD', 'keyW']

document.addEventListener('keydown', (e) => {
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = true;
    }
})

document.addEventListener('keyup', (e) => {
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = false;
    }
})


game.startScreen.addEventListener('click', (e) => {
    // change the screens
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    // start the game
    start(state, game)
})