function sumOfSquares() {
  console.log(
    solution(5)
  )
}

function solution(gridNum) {
  let grid = []
  let maxNum = 9

  for (let i = 0; i < gridNum; i++) {
    grid[i] = []
    for (let j = 0; j < gridNum; j++) {
      grid[i][j] = maxNum
    }
  }

  let doubleGridNum = gridNum * 2
  let amountToRemove = []
  for (let i = 0; i < doubleGridNum; i++) {
    amountToRemove[i] = -(maxNum * (gridNum) % (i + 1))
  }

  // console.log(amountToRemove)

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (i === 0) {
        // grid[i][j] = grid[i][j] + amountToRemove[j + 5]
      } else {
         let diff = amountToRemove[j+5] - amountToRemove[i]
         amountToRemove[j+5] = diff
         
          grid[i][j] = grid[i][j] + amountToRemove[j]
      }

    }
    
  }

  console.log(amountToRemove)
  console.log(grid)
}
