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

  resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "-";
    }
  };

  return {
    getBoard,
    setMark,
    consolelogBoard,
    resetBoard,
  };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  let player1;
  let player2;
  let resultDiv = document.querySelector(".game-result");
  const initializePlayers = (() => {
    let form = document.querySelector(".form");
    let player1Name = document.querySelector(".player1");
    let player2Name = document.querySelector(".player2");
    let submitBtn = document.querySelector(".submit-usernames");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (player1Name.value.length > 0 && player2Name.value.length > 0) {
        player1 = Player(player1Name.value, "X");
        player2 = Player(player2Name.value, "O");
        form.remove();
        currentPlayer = player1;
        Gameboard.resetBoard();
      }
    });
  })();
  if (!player1 && !player2) {
    player1 = Player("player1", "X");
    player2 = Player("player2", "O");
  }

  let isGameover = false;
  let currentPlayer = player1;

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

  const resetGame = () => {
    Gameboard.resetBoard();
    isGameover = false;
    currentPlayer = player1;
  };

  return { playRound, resetGame };
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

  let resultDiv = document.querySelector(".game-result");
  let resetBtn = document.querySelector(".reset-game");
  const resetListener = () => {
    resetBtn.addEventListener("click", () => {
      GameController.resetGame();
      renderContent();
      resultDiv.textContent = "RESULT";
    });
  };
  return { renderContent, cellListeners, resetListener };
})();

DisplayController.renderContent();
DisplayController.cellListeners();
DisplayController.resetListener();

let player1Name = document.querySelector(".player1");
let player2Name = document.querySelector(".player2");
let submitBtn = document.querySelector(".submit-usernames");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(player1Name.value);
  console.log(player2Name.value);
});
