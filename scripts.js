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
    } else console.log(`${index} square is already marked`);
  };

  return {
    getBoard,
    setMark,
    consolelogBoard,
  };
})();

console.log(Gameboard.getBoard());
console.log(Gameboard.setMark(1, "X"));
console.log(Gameboard.setMark(1, "O"));
console.log(Gameboard.getBoard());
Gameboard.consolelogBoard();
