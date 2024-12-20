const grid = document.getElementById("grid");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  grid.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleCellClick);
    grid.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === "") {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");
    if (checkWin()) {
      result.textContent = `${currentPlayer} Wins!`;
      grid.childNodes.forEach((cell) =>
        cell.removeEventListener("click", handleCellClick)
      );
    } else if (board.every((cell) => cell !== "")) {
      result.textContent = "It's a Draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

restartBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  result.textContent = "";
  createBoard();
});

createBoard();
