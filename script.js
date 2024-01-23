document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');

    let currentPlayer = 'X';
    let cells = Array(9).fill(null);

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    function handleCellClick(index) {
        if (cells[index] === null) {
            cells[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                showResult(`Player ${currentPlayer} wins!`);
            } else if (cells.every(cell => cell !== null)) {
                showResult('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function renderBoard() {
        cells.forEach((value, index) => {
            document.querySelector(`.cell[data-index="${index}"]`).textContent = value;
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a] !== null && cells[a] === cells[b] && cells[b] === cells[c];
        });
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    }

    window.resetGame = function () {
        cells = Array(9).fill(null);
        currentPlayer = 'X';
        renderBoard();
        resultScreen.style.display = 'none';
    };
});
