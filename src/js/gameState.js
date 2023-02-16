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
        bugStats: {
            width: 50,
            height: 50,
            nextSpawnTimeStamp: 0,
            maxSpawnInterval: 1500,
            speed: 7,
        },
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
        }
    }
    return state
}