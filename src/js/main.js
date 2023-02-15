const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');

startScreen.addEventListener('click', (e) => {
    e.currentTarget.classList.add('hidden')
    gameScreen.classList.remove('hidden')
})