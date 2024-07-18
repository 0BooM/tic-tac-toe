const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  getBoard = () => board;

  setMark = (index, mark) => {
    if (board[index] == "") {
      board[index] = mark;
      console.log(`You placed ${mark} on square number ${index}`);
    } else console.log(`${index} square is already marked`);
  };
  return {
    getBoard,
    setMark,
  };
})();

console.log(Gameboard.getBoard());
console.log(Gameboard.setMark(1, "X"));
console.log(Gameboard.setMark(1, "O"));
console.log(Gameboard.getBoard());
