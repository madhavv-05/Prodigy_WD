// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Create game board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameState[index] === '' && !checkWinner()) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            status.textContent = `${currentPlayer} wins!`;
        } else if (!gameState.includes('')) {
            status.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Initial status message
status.textContent = `Player ${currentPlayer}'s turn`;
