function sumOfSquares() {
  console.log(
    solution(1),
    solution(2),
    solution(3),
    solution(4),
    solution(5),
  )
}
/**
 * This Code does work from 6 and above
 */
function solution(gridNum) {
  let grid = []
  let maxVal = 9
  let doubleGridNum = gridNum * 2
  let amountToRemoveCol = []
  let amountToRemoveRow = []
  let diff = 0

  for (let i = 0; i < doubleGridNum; i++) {
    if (i < gridNum) {
      amountToRemoveRow[i%gridNum] = -(maxVal * (gridNum) % (i + 1))
    } else {
      amountToRemoveCol[i%gridNum] = -(maxVal * (gridNum) % (i + 1))
    }
  }

  for (let i = 0; i < gridNum; i++) {
    grid[i] = []
    for (let j = 0; j < gridNum; j++) {
           let maxNum = Math.max(amountToRemoveRow[i],amountToRemoveCol[j])
      amountToRemoveRow[i] -= maxNum
      amountToRemoveCol[j] -= maxNum
      grid[i][j] = maxVal + maxNum
      diff += maxNum
    }
  }

  for (let i =0; i< amountToRemoveCol.length; i++){
    grid[0][i] += amountToRemoveCol[i]
  }
  diff += amountToRemoveCol.reduce((prev,curr) => prev+curr)
  let num = grid.map(n => n.join('')).join('')
  return [(maxVal*gridNum*gridNum)+diff, num]
}
