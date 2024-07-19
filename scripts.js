const Gameboard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  getBoard = () => board;

  consolelogBoard = () => {
    console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
    console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
    console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
  };

  setMark = (index, mark) => {
    if (board[index] == "-") {
      board[index] = mark;
      //console.log(`You placed ${mark} on square number ${index}`);
      return true;
    } else {
      //console.log(`${index} square is already marked`);
      return false;
    }
  };

  return {
    getBoard,
    setMark,
    consolelogBoard,
  };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  let resultDiv = document.querySelector(".game-result");
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let currentPlayer = player1;
  let isGameover = false;

  const playRound = (index) => {
    if (!isGameover) {
      playerMove = index;
      console.log(currentPlayer.mark);
      console.log(Gameboard.getBoard());
      if (
        Gameboard.setMark(playerMove, currentPlayer.mark) == false ||
        playerMove < 0 ||
        playerMove > 8
      ) {
      } else {
        Gameboard.setMark(playerMove, currentPlayer.mark);

        let winner = checkWinner();
        if (winner) {
          isGameover = true;
          if (winner == "It's a tie!") resultDiv.textContent = winner;
          else resultDiv.textContent = `The winner is ${winner}!`;
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
      }
    }
  };

  const checkWinner = () => {
    const gameboard = Gameboard.getBoard();
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
    for (let combination of winningCombinations) {
      let [a, b, c] = combination;
      if (
        gameboard[a] !== "-" &&
        gameboard[a] == gameboard[b] &&
        gameboard[a] == gameboard[c]
      )
        return currentPlayer.name;
    }

    if (!gameboard.includes("-")) return `It's a tie!`;

    return null;
  };

  return { playRound };
})();

const DisplayController = (() => {
  let board = document.querySelector(".board");
  let cells = Array.from(board.querySelectorAll(".cell"));
  const renderContent = () => {
    let board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const cellListeners = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        GameController.playRound(index);
        renderContent();
      });
    });
  };
  return { renderContent, cellListeners };
})();

DisplayController.renderContent();
DisplayController.cellListeners();
