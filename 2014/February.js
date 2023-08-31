function hooks() {
  console.time('lol')

  let targetRowNumbers = [26, 42, 11, 22, 42, 36, 29, 32, 45]
  let targetColNumbers = [31, 19, 45, 16, 5, 47, 28, 49, 45]
  let { grid, totalUncertainCells } = generateHookGrid()
  // console.log(totalUncertainCells) // 80

  // console.log(grid)
  // 	[ 
  //    [ 
  //      { number: 1, row: 0, col: 0, certainty: true },
  //      { number: 2, row: 0, col: 1, certainty: false },
  //      { number: 3, row: 0, col: 2, certainty: false },
  //      ...
  //      ...
  //      ...
  //      { number: 9, row: 8, col: 5, certainty: false },
  //      { number: 9, row: 8, col: 6, certainty: false },
  //      { number: 9, row: 8, col: 7, certainty: false },
  //      { number: 9, row: 8, col: 8, certainty: false } 
  //    ]
  //  ]
  let [sheetGrid, certainGrid] = formatGrid(grid)
  console.log(sheetGrid)
  console.log(certainGrid)
  console.log(totalUncertainCells)

  while (totalUncertainCells > 0) {
    // Check Rows
    for (let i = 0; i < grid.length; i++) {
      let listOfNumbers = grid[i]

      let listOfUnsureNumbers = listOfNumbers.filter(g => !g.certainty)
      let listOfsureNumbers = listOfNumbers.filter(g => g.certainty)
      let targetNumber = targetRowNumbers[i] - listOfsureNumbers.map(cell => cell.number).reduce((a, b) => a + b, 0)

      let [_, partitions] = createPartitons(targetNumber, listOfUnsureNumbers.map(cell => cell.number))
      let listPossiblePartitions = Array.from(partitions)
      let [absentNumbers, commonNumbers] = findSureNumbers(listOfUnsureNumbers, listPossiblePartitions)
      let filteredDuplicateCommonNumbers = commonNumbers.filter(cell => cell.number === i + 1)
      let filteredNoneDuplicateCommonNumbers = commonNumbers.filter(cell => cell.number !== i + 1)

      if (listPossiblePartitions.length === 1 && listPossiblePartitions[0].split(',').length === filteredDuplicateCommonNumbers.length) {
        totalUncertainCells = updateCells(filteredDuplicateCommonNumbers, 1, grid, totalUncertainCells)
      }
      totalUncertainCells = updateCells(filteredNoneDuplicateCommonNumbers, 1, grid, totalUncertainCells)
      totalUncertainCells = updateCells(absentNumbers, 0, grid, totalUncertainCells)

    }

    // Check Cols
    for (let i = 0; i < grid.length; i++) {
      let listOfNumbers = grid.map(g => g[i])
      let listOfUnsureNumbers = listOfNumbers.filter(g => !g.certainty)
      let listOfsureNumbers = listOfNumbers.filter(g => g.certainty)
      let targetNumber = targetColNumbers[i] - listOfsureNumbers.map(cell => cell.number).reduce((a, b) => a + b, 0)
      let [_, partitions] = createPartitons(targetNumber, listOfUnsureNumbers.map(cell => cell.number))
      let listPossiblePartitions = Array.from(partitions)
      let [absentNumbers, commonNumbers] = findSureNumbers(listOfUnsureNumbers, listPossiblePartitions)
      let filteredDuplicateCommonNumbers = commonNumbers.filter(cell => cell.number === i + 1)
      let filteredNoneDuplicateCommonNumbers = commonNumbers.filter(cell => cell.number !== i + 1)



      totalUncertainCells = updateCells(absentNumbers, 0, grid, totalUncertainCells)
      totalUncertainCells = updateCells(filteredNoneDuplicateCommonNumbers, 1, grid, totalUncertainCells)

      if (listPossiblePartitions.length === 1 && listPossiblePartitions[0].split(',').length === filteredDuplicateCommonNumbers.length) {
        totalUncertainCells = updateCells(filteredDuplicateCommonNumbers, 1, grid, totalUncertainCells)
      }

    }

  }
  
  [sheetGrid, certainGrid] = formatGrid(grid)
  console.log(sheetGrid)
  console.log(certainGrid)
  console.log(totalUncertainCells)


  console.timeEnd('lol')
}

function formatGrid(grid) {
  let sheetGrid = []
  let certainGrid = []
  for (let i = 0; i < grid.length; i++) {
    sheetGrid[i] = []
    certainGrid[i] = []
    for (let j = 0; j < grid.length; j++) {
      sheetGrid[i][j] = grid[i][j].number
      certainGrid[i][j] = +grid[i][j].certainty
    }
  }
  return [sheetGrid, certainGrid]

}

function updateCells(arr, multiple, grid, totalUncertainCells) {

  for (let i = 0; i < arr.length; i++) {
    grid[arr[i]['row']][arr[i]['col']]['number'] *= multiple
    grid[arr[i]['row']][arr[i]['col']]['certainty'] = true
    totalUncertainCells = totalUncertainCells - 1
  }
  return totalUncertainCells
}

// function updateRow(arr, multiple, listOfNumbers) {

//   for (let i = 0; i < arr.length; i++) {
//     listOfNumbers[arr[i]['col']]['number'] *= multiple
//     listOfNumbers[arr[i]['col']]['certainty'] = true
//   }

//   return listOfNumbers
// }

function findSureNumbers(listOfNumbers, listPossiblePartitions) {
  let [absentNumbers, commonNumbers] = [[], []]

  for (let i = 0; i < listOfNumbers.length; i++) {
    let cell = listOfNumbers[i]

    let isabsent = listPossiblePartitions.every(num => !num.split(',').includes(`${cell.number}`))
    if (isabsent) {
      absentNumbers.push(cell)
    }

    let isCommon = listPossiblePartitions.every(num => num.split(',').includes(`${cell.number}`))
    if (isCommon) {
      commonNumbers.push(cell)
    }

  }

  return [absentNumbers, commonNumbers]
}

function generateHookGrid() {
  let grid = []
  let nbyn = 9
  let totalUncertainCells = nbyn * nbyn

  for (let i = 0; i < nbyn; i++) {
    grid[i] = []
    for (let j = 0; j < nbyn; j++) {

      if (j < i) {
        grid[i][j] = {
          number: i + 1,
          row: i,
          col: j,
          certainty: false,
        }
      }
      else {
        grid[i][j] = {
          number: j + 1,
          row: i,
          col: j,
          certainty: false,
        }
      }


    }
  }

  grid[0][0]['certainty'] = true
  totalUncertainCells--
  return { grid, totalUncertainCells }
}

// function (targetNumber, listOfNumbers, totalNumber, set, subArray = []) {

//   if (totalNumber === targetNumber) return [subArray.slice(), set]
//   if (listOfNumbers.length === 0) return [[], set]
//   if (totalNumber > targetNumber) return [[], set]


//   for (let i = 0; i < listOfNumbers.length; i++) {

//     let num = listOfNumbers[i]
//     let tempListOfNumbers = listOfNumbers.slice()
//     tempListOfNumbers.splice(i, 1)
//     subArray.push(num)
//     totalNumber = subArray.reduce((a, b) => a + b)
//     let [path, _] = 1(targetNumber, tempListOfNumbers, totalNumber, set, subArray)

//     if (path.length > 0) { set.add(JSON.stringify(path.sort())) }
//     subArray.pop()
//   }
//   return [[], set]

// }

function createPartitons(targetNumber, listOfNumbers) {
  let totalNumber = 0
  let set = new Set()
  let subArray = []
  let memo = {}

  const partitions = (targetNumber, listOfNumbers, totalNumber, set, subArray, memo) => {

    let subArrayCopy = subArray.slice()
    let memoKey = subArrayCopy.sort().join('')
    if (memo[memoKey]) return [[], set]
    memo[memoKey] = 'seen ' + totalNumber

    if (totalNumber === targetNumber) return [subArrayCopy, set]
    if (listOfNumbers.length === 0) return [[], set]
    if (totalNumber > targetNumber) return [[], set]

    for (let i = 0; i < listOfNumbers.length; i++) {

      let num = listOfNumbers[i]
      let tempListOfNumbers = listOfNumbers.slice()
      tempListOfNumbers.splice(i, 1)
      subArray.push(num)
      totalNumber = subArray.reduce((a, b) => a + b)
      let [path, _] = partitions(targetNumber, tempListOfNumbers, totalNumber, set, subArray, memo)

      if (path.length > 0) { set.add(path.sort().join(',')) }
      subArray.pop()
    }
    return [[], set]

  }

  return partitions(targetNumber, listOfNumbers, totalNumber, set, subArray, memo)
}


