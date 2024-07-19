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
      console.log(`You placed ${mark} on square number ${index}`);
      return true;
    } else {
      console.log(`${index} square is already marked`);
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
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let currentPlayer = player1;
  let isGameover = false;
  let test = 0;
  const playRound = () => {
    while (!isGameover) {
      let playerMove = "";
      playerMove = prompt(
        `${currentPlayer.name} make your move, pick your place (1-9): `
      );
      if (
        Gameboard.setMark(playerMove - 1, currentPlayer.mark) == false ||
        playerMove < 1 ||
        playerMove > 9
      ) {
      } else {
        Gameboard.setMark(playerMove - 1, currentPlayer.mark);

        let winner = checkWinner();
        if (winner) {
          isGameover = true;
          if (winner == "It's a tie!") console.log(winner);
          else console.log(`The winner is ${winner}!`);
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
      }
      Gameboard.consolelogBoard();
      test++;
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

GameController.playRound();
