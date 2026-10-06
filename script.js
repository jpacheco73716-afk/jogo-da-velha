const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function checkWinner() {
  return winningCombinations.some(([a, b, c]) =>
    board[a] &&
    board[a] === board[b] &&
    board[a] === board[c]
  );
}

function isDraw() {
  return board.every(Boolean);
}

function updateBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.disabled = Boolean(board[index]) || gameOver;
    cell.setAttribute(
      "aria-label",
      board[index] ? `Casa ${index + 1}: jogador ${board[index]}` : `Casa ${index + 1}: vazia`
    );
  });
}

function play(index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
    gameOver = true;
  } else if (isDraw()) {
    status.textContent = "Empate! 🤝";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Vez do jogador ${currentPlayer}`;
  }

  updateBoard();
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "Vez do jogador X";
  updateBoard();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    play(Number(cell.dataset.index));
  });
});

restartButton.addEventListener("click", restartGame);

updateBoard();
