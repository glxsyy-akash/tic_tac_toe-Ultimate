const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

const resultOverlay = document.getElementById('resultOverlay');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  resultOverlay.classList.add('hidden');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick, { once: true });
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showResultScreen(`🎉 Player ${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showResultScreen("😐 It's a Draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winningCombos.some(combo =>
    combo.every(index => gameState[index] === currentPlayer)
  );
}

function showResultScreen(message) {
  resultMessage.textContent = message;
  resultOverlay.classList.remove('hidden');
}

resetBtn.addEventListener('click', createBoard);
newGameBtn.addEventListener('click', createBoard);

// Initialize game on page load
createBoard();
