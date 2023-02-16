function startGameLoop(state, game) {
    console.log(state.player);
    window.requestAnimationFrame(startGameLoop)
}