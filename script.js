let currentPlayer = 'X'; // 
let board = Array(9).fill(null); // 
let isPlayingAgainstComputer = false; // 


function startGame() {
    const playAgainstComputer = document.getElementById("play-against-computer").value;
    isPlayingAgainstComputer = playAgainstComputer === "yes";
    resetGame(); // Reinicia o tabuleiro para um novo jogo
}


function makeMove(cell, index) {
    if (board[index] === null) {
        board[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'X' ? '<h3>👽<h3>' : '<h3>🍒</h3>'; 

       
        if (checkWinner()) {
            setTimeout(() => alert(`${currentPlayer} venceu!`), 100);
            resetGame();
        } else if (board.every(cell => cell !== null)) {
            setTimeout(() => alert('Deu velha!'), 100);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';


            // Se está jogando contra a máquina e é a vez dela (O)
            if (isPlayingAgainstComputer && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); // Espera meio segundo antes da jogada da máquina
            }
        }
    }
}


// Função para a jogada da máquina (IA simples)
function makeComputerMove() {
    let availableMoves = board.map((value, index) => value === null ? index : null).filter(index => index !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    // Faz a jogada em uma célula vazia aleatória
    const cell = document.querySelectorAll('td')[randomMove];
    makeMove(cell, randomMove);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board.fill(null);
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
}
