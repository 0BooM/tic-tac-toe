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
    while (test < 8) {
      let playerMove = "";
      playerMove = prompt(
        `${currentPlayer.name} make your move, pick your place (1-9): `
      );
      if (Gameboard.setMark(playerMove - 1, currentPlayer.mark) == false) {
      } else {
        Gameboard.setMark(playerMove - 1, currentPlayer.mark);
        if (currentPlayer == player1) currentPlayer = player2;
        else currentPlayer = player1;
      }
      console.log(Gameboard.consolelogBoard());
      test++;
    }
  };

  return { playRound };
})();

GameController.playRound();
