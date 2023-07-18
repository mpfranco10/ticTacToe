const checkRow = (myBoard: string[][], token: string, i: number): boolean => {
  let full = true;
  let row = myBoard[i];
  for (let t in row) {
    full = full && row[t] === token;
  }
  return full;
};

const checkColumn = (
  myBoard: string[][],
  token: string,
  i: number,
  j: number
): boolean => {
  let full = true;
  let row = myBoard[i];
  for (let t in row) {
    full = full && myBoard[t][j] === token;
  }
  return full;
};

const checkUpToDownDiagonal = (myBoard: string[][], token: string): boolean => {
  let t1 = myBoard[0][0];
  let t2 = myBoard[1][1];
  let t3 = myBoard[2][2];
  let ans = t1 === token && t1 === t2 && t1 === t3;
  return ans;
};

const checkDownToUpDiagonal = (myBoard: string[][], token: string): boolean => {
  let t1 = myBoard[2][0];
  let t2 = myBoard[1][1];
  let t3 = myBoard[0][2];
  let ans = t1 === token && t1 === t2 && t1 === t3;
  return ans;
};

const shouldCheckDownToUpDiagonal = (i: number, j: number): boolean => {
  let c1 = i === 2 && j === 0;
  let c2 = i === 1 && j === 1;
  let c3 = i === 0 && j === 2;
  return c1 || c2 || c3;
};

export function checkForWinner(
  myBoard: string[][],
  token: string,
  i: number,
  j: number
): null | string {
  let winner = null;
  if (checkRow(myBoard, token, i)) {
    return token;
  }
  if (checkColumn(myBoard, token, i, j)) {
    return token;
  }
  if (i === j && checkUpToDownDiagonal(myBoard, token)) {
    return token;
  }
  if (
    shouldCheckDownToUpDiagonal(i, j) &&
    checkDownToUpDiagonal(myBoard, token)
  ) {
    return token;
  }
  return winner;
}

export function getNextTurn(currentToken: string): string {
  return currentToken === 'X' ? 'O' : 'X';
}
