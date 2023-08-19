function sumOfSquares() {
  let gridNumber = 5 // You can change this value.
  console.log(solution(gridNumber))
}
/**
 * This code was written in google Apps Script (Javascript)
 * This code works from a (1X1) to a (9X9) grid
 */
function sumOfSquaresSolution(gridNum) {
  let grid = []
  let maxVal = 9
  let doubleGridNum = gridNum * 2
  let amountToRemoveCol = []
  let amountToRemoveRow = []
  let diff = 0

  for (let i = 0; i < doubleGridNum; i++) {
    if (i < gridNum) {
      amountToRemoveRow[i % gridNum] = -(maxVal * (gridNum) % (i + 1))
    } else {
      amountToRemoveCol[i % gridNum] = -(maxVal * (gridNum) % (i + 1))
    }
  }

  for (let i = 0; i < gridNum; i++) {
    grid[i] = []
    for (let j = 0; j < gridNum; j++) {
      grid[i][j] = 9
    }
  }

  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      let jj = getJJ(j, amountToRemoveCol)
      let maxNum = Math.max(amountToRemoveRow[i], amountToRemoveCol[jj])
      amountToRemoveRow[i] -= maxNum
      amountToRemoveCol[jj] -= maxNum
      grid[i][jj] += maxNum
      diff += maxNum
    }
  }

  for (let i = 0; i < amountToRemoveCol.length; i++) {
    grid[0][i] += amountToRemoveCol[i]
  }

  diff += amountToRemoveCol.reduce((prev, curr) => prev + curr)
  let num = grid.map(n => n.join('')).join('')
  return [(maxVal * gridNum * gridNum) + diff, num]
}

function getJJ(j, cols = []) {
  let newCols = cols.map(c => c).sort((a, b) => a - b)
  return cols.indexOf(newCols[j])
}
