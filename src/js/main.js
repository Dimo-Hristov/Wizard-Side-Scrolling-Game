let state = initState();
let game = initGameObjects();

game.startScreen.addEventListener('click', (e) => {
    // change the screens
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    // start the game
    start(state, game)
})