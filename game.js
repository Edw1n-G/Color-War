const boardSize = 10; // ← Change as u wish. Should be the same as in the .css
const board = document.getElementById('board');
const statusBar = document.getElementById('statusBar');
let currentPlayer = 1; // Player 1 starts
let firsttiles = 4;

// Define colors for players add/remove when changing player Count      Also cange values in line 62 & 70
const playerColors = ['blue', 'darkred', 'goldenrod', 'green'];

// Initialize the board
for (let i = 0; i < boardSize * boardSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.addEventListener('click', () => handleTileClick(i));
    board.appendChild(tile);
}

// Initialize the status bar
updateStatusBar();

// Handle tile click
function handleTileClick(index) {
    const tile = board.children[index];
    console.log('Click')

    // Check if the tile is empty or belongs to the current player
    if (!tile.textContent || tile.style.backgroundColor === playerColors[currentPlayer - 1]) {
        // If the tile belongs to the current player, allow the move
        const value = parseInt(tile.textContent) || 0;

        if (!tile.textContent) {
            //the counter for empty tile clicks at game start
            firsttiles--;
            console.log('firsttiles');

            // Check if the maximum allowed empty tile clicks is reached
            if (firsttiles < 0) {
                // If more than four clicks on empty tiles, return without making any changes
                console.log('firsttiles over');
                return;
            }
        }
        // Check if the tile value is 4
        if ((value % 4) + 1 === 4) {
            // Reset the tile to default
            tile.textContent = '';//value = 0
            tile.style.backgroundColor = '';//color = deafault
            console.log('BOOM');

            //If 4 make boom
            updateAdjacentTiles(index);
        } else{
            // tile value +1
            tile.textContent = (value % 4) + 1;
            tile.style.backgroundColor = playerColors[currentPlayer - 1];
            console.log('value +1');
        }

        

        if (firsttiles <= 0) {                // ↓ Change to Player Count
            do{ currentPlayer = (currentPlayer % 4) +1;
            updateStatusBar();
             } while
             (!playerHasTilesLeft(currentPlayer));


        } else { //only first round         ↓ Change to Player Count
            currentPlayer = (currentPlayer % 4) + 1;
            updateStatusBar()
        }
    }
}

function playerHasTilesLeft(player) {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const tile = board.children[i];
        if (tile.style.backgroundColor === playerColors[player-1]) {
            console.log('next Player has tiles left')
            return true;
        }
    }
    console.log('nextPlayer has no tiles')
    return false;
}

// Update adjacent tiles aka make boom boom
function updateAdjacentTiles(index) {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 }   // Right
    ];

    for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        // Check if the new position is within the board bounds
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            const adjacentIndex = newRow * boardSize + newCol;
            const adjacentTile = board.children[adjacentIndex];

            // Update adjacent tile to value (value % 4) + 1
            const adjacentValue = parseInt(adjacentTile.textContent) || 0;
            adjacentTile.textContent = (adjacentValue % 4) + 1;
            adjacentTile.style.backgroundColor = playerColors[currentPlayer - 1];

            // Check if the adjacent tile value is 4, then reset it
            if ((adjacentValue % 4) + 1 === 4) {
                adjacentTile.textContent = '';
                adjacentTile.style.backgroundColor = '';

                // Recursive call to update tiles around the reset tile aka big boom boom
                updateAdjacentTiles(adjacentIndex);
            }
        }
    }
}

function updateStatusBar() {
    const playerStatus = document.createElement('div');
    playerStatus.className = 'player-status';
    playerStatus.style.backgroundColor = playerColors[currentPlayer - 1];

    const boardContainer = document.querySelector('.board');
    boardContainer.appendChild(playerStatus);
}
