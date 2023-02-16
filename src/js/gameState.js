function initState() {
    let startX = 200;
    let startY = 300;

    const state = {
        player: 'Pesho',
        wizard: {
            width: 82,
            height: 100,
            posX: startX,
            posY: startY,
            speed: 10,
        },
        keys: {}
    }
    return state
}