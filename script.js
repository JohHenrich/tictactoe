 
// Initialize player fields as two-dimensional arrays filled with zeros
let playerfields1 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let playerfields2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

// Initialize game state variables
let gameOver = false;
let gameCounter = 0;
let currentShape = 'circle';

// Initialize audio elements for player clicks
let audioClick1 = new Audio('./audio/click1.mp3');
let audioClick2 = new Audio('./audio/click2.mp3');


/**
 * Function that sets a game element to the current player's shape
 * @param {number} x - The x-coordinate of the element to set
 * @param {number} y - The y-coordinate of the element to set
 */
function setElement(x, y) {

    // Check that the game is still ongoing and that the current game element is empty
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
         // Switch to the next player and check if the game has ended
        troggelPlayer();
        checkEndGame();
    }
}


/**
 * Function that switches the active player
 */
function troggelPlayer() {
    document.getElementById('player-1').classList.toggle('player-inactive');
    document.getElementById('player-2').classList.toggle('player-inactive');
}


/**
 * Function that draws a player's shape on the game field
 * @param {Array<Array<number>>} playerfields - A 2D array representing the player's fields
 */
function drawplayer(playerfields, element) {
    for (let x = 0; x < playerfields.length; x++) {
        for (let y = 0; y < playerfields.length; y++) {
            if (playerfields[x][y] == 1) {
                document.getElementById(element + x + y).classList.remove('d-none');
            }
        }
    }
}


/**
 * Function that checks if a player has won the game
 * @param {Array<Array<number>>} playerfields - A 2D array representing the player's fields
 */
function checkWinner(playerfields) {
    if (checkLines(playerfields) || checkDiagonal(playerfields)) {
        gameOverScreen();
    }
}


/**
 * Checks if there is a horizontal or vertical line of three in a 2D array representing the player's fields
 * @param {Array<Array<number>>} playerfields - A 2D array representing the player's fields
 * @returns {boolean} - True if there is a line of three, false otherwise
 */
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


/**
 * Checks if there is a diagonal line of three in a 2D array representing the player's fields
 * @param {Array<Array<number>>} playerfields - A 2D array representing the player's fields
 * @returns {boolean} - True if there is a line of three, false otherwise
*/
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




/**
 * Highlights all elements with a given class name.
 * @param {string} classType - The class name of the elements to highlight.
 */
function highlightElements(classType) {
    let myElementes = document.getElementsByClassName(classType);

    for (var i = 0; i < myElementes.length; i++) {
        myElementes[i].classList.add('highlightElements');
    }
}


/**
 * Checks if the game has ended, and triggers the game over screen if it has.
 * Otherwise, increments the game counter.
 */
function checkEndGame(params) {
    if (gameCounter == 8) {
        gameOverScreen();
    }
    else{
        gameCounter++;
    }
}


/**
 * Displays the game over screen and restart button after a short delay.
 */
function gameOverScreen() {
    gameOver = true;
    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
    }, 1500);
}