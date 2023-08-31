function alteredStates() {
  let states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  console.log(alteredStatesSolution(states))
}

function alteredStatesSolution(states) {
  let alphabetGrid = setUpAlphabetGrid()

  for (let i = 0; i < states.length; i++) {
    let state = states[i].replace(' ','')
    for (let j = 0; j < state.length - 1; j++) {
      let letter1 = state[j].toUpperCase()
      let letter2 = state[j + 1].toUpperCase()
      if(letter1 === letter2){continue}
      let index1 = letter1.charCodeAt(0)-65
      let index2 = letter2.charCodeAt(0)-65
      // console.log(index1,index2)
      alphabetGrid[index1][index2] = 1//+= 1
    }
  }

  SpreadsheetApp
  .openByUrl('https://docs.google.com/spreadsheets/d/1KOruE1ScB2rhPRu88otUqRLZELz-ikrzQhUo_k_0Q4o/edit#gid=1261884809')
  .getSheetByName('March')
  .getRange(4,4,alphabetGrid.length,alphabetGrid[0].length)
  .setValues(alphabetGrid)
    return alphabetGrid

}

function setUpAlphabetGrid() {
  let arr = []
  let grid = 26//27

  for (let i = 0; i < grid; i++) {
    arr[i] = []
    for (let j = 0; j < grid; j++) {
      // if (i === 0 && j === 0) {arr[i][j] = 0;continue}
      // if (i === 0) { arr[i][j] = String.fromCharCode(65 + j-1); continue }
      // if (j === 0) { arr[i][j] = String.fromCharCode(65 + i-1); continue }

      arr[i][j] = 0
    }

  }
  return arr
}



