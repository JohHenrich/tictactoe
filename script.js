let playerfields1 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let playerfields2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let gameOver = false;
let gameCounter = 0;
let currentShape = 'circle';
let audioClick1 = new Audio('./audio/click1.mp3');
let audioClick2 = new Audio('./audio/click2.mp3');

function setElement(x, y) {
    if ((playerfields1[x][y] == 0) && (playerfields2[x][y] == 0) && !gameOver) {
        if (currentShape == 'cross') {
            playerfields1[x][y] = 1;
            drawplayer(playerfields1, 'cross-')
            checkWinner(playerfields1);
            audioClick1.play();
            currentShape = 'circle'
        } else {
            playerfields2[x][y] = 1;
            drawplayer(playerfields2, 'circle-')
            checkWinner(playerfields2);
            audioClick2.play();
            currentShape = 'cross'
        }
        troggelPlayer();
        checkEndGame();
    }
}

function troggelPlayer() {
    document.getElementById('player-1').classList.toggle('player-inactive');
    document.getElementById('player-2').classList.toggle('player-inactive');
}

function drawplayer(playerfields, element) {
    for (let x = 0; x < playerfields.length; x++) {
        for (let y = 0; y < playerfields.length; y++) {
            if (playerfields[x][y] == 1) {
                document.getElementById(element + x + y).classList.remove('d-none');
            }
        }
    }
}

function checkWinner(playerfields) {
    if (checkLines(playerfields) || checkDiagonal(playerfields)) {
        gameOverScreen();
    }
}

function checkLines(playerfields) {
    for (let x = 0; x < playerfields.length; x++) {
        let bufferX = 0;
        let bufferY = 0;
        for (let y = 0; y < playerfields.length; y++) {
            bufferX += playerfields[x][y];
            bufferY += playerfields[y][x];
        }
        if (bufferX == 3) {
            highlightElements('horizontale-' + x);
            return true;
        }
        if (bufferY == 3) {
            highlightElements('vertikale-' + x);
            return true;
        }
    }
}

function checkDiagonal(playerfields) {
    let secLine = [2, 1, 0];
    let buffer1 = 0;
    let buffer2 = 0;

    for (let x = 0; x < playerfields.length; x++) {
        buffer1 += playerfields[x][x];
        buffer2 += playerfields[x][secLine[x]];
    }
    if (buffer1 == 3) {
        highlightElements('diagonale-1');
        return true;
    }
    if (buffer2 == 3) {
        highlightElements('diagonale-2');
        return true;
    }
}

function highlightElements(classType) {
    let myElementes = document.getElementsByClassName(classType);

    for (var i = 0; i < myElementes.length; i++) {
        myElementes[i].classList.add('highlightElements');
    }
}

function checkEndGame(params) {
    if (gameCounter == 8) {
        gameOverScreen();
    }
    else{
        gameCounter++;
    }
}

function gameOverScreen() {
    gameOver = true;
    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
    }, 1500);
}