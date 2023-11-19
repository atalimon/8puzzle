let messageFirst = document.getElementById('first');
let messageSecond = document.getElementById('second');
let messageThird = document.getElementById('third');
let messageCards = document.querySelectorAll('.card')
let startButton = document.getElementById('start')
let mainContainer = document.getElementById('container')
let gameContainer = document.getElementById('game-container')
let pickButton = document.querySelectorAll('.game')
let puzzleStart = document.getElementById('start-game')
let gamesdiv = document.getElementById('games')
let PuzzleImageContainer = document.getElementById('main-container')
let gameStartButton = document.getElementById('start-game')
let puzzleContainer = document.getElementById('puzzle-container')
let firstOption = document.getElementById('option-1')
let twoOption = document.getElementById('option-2')
let threeOption = document.getElementById('option-3')
let congrats = document.getElementById('congrats')
let shuffletext = document.getElementById('shuffle-text')
let hiddenElement;
let countdown;
let count = 4;

let dropButton = document.getElementById('dropdownHoverButton')
let dropList = document.getElementById('dropdownHover')
let tree = document.querySelector('.tree')
let thirty = document.querySelector('.thirty')




// slider function
function slider(cards) {
    
    countdown = setInterval(() =>{
        count--;
        
        if (count==3) {
            messageFirst.classList.add('hidden')
            messageThird.classList.add('hidden')
            messageSecond.classList.remove('hidden')
        }
        else if (count==2) {
            messageFirst.classList.remove('hidden')
            messageSecond.classList.add('hidden')
        }
        else if  (count == 1) {
            count = 4;
            messageFirst.classList.add('hidden')
            messageThird.classList.remove('hidden')
            setInterval(count)
        }

    },2000)
  
}
slider()

startButton.addEventListener('click', function (){
   mainContainer.classList.add('hidden')
   gameContainer.classList.remove('hidden')
   clearInterval(countdown)
   puzzleStart.classList.add("hidden")

   
})


// dropdown 





const doggie_img = document.createElement('img')
doggie_img.src = 'dog.jpeg'
doggie_img.className = 'image-container   rounded-lg'

const cat_img = document.createElement('img')
cat_img.src = 'cat.jpeg'
cat_img.className = ' image-container   rounded-lg'

const panda_img = document.createElement('img')
panda_img.src = 'panda.jpeg'
panda_img.className = 'image-container  rounded-lg'



gameStartButton.addEventListener('click', function(){
    gameContainer.classList.add('hidden')
    puzzleContainer.classList.remove('hidden')

})

// Image selection
let last = 'cat.jpeg'
pickButton.forEach((btn) => {
  btn.addEventListener('click', function () {
      puzzleStart.classList.remove("hidden")
      btn.classList.add('selected')
      if (btn.id === "option-1") {
        last = 'dog.jpeg'
       
      } else if (btn.id === "option-2") {
        
        last = 'cat.jpeg'
      } else {
        
        last = 'panda.jpeg'
      }
      CreatePuzzlePieces()
      workingPuzzle()
      
      
      
  })
  
 
})



let counter = 0; 

  const initialState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
 

  const rows = initialState.length;
  const cols = initialState[0].length;
  const initialPositions = Array.from({ length: rows }, () => Array(cols));
  const grid = Array.from({ length: rows }, () => Array(cols));

  const puzzlePieces = Array.from({ length: rows }, () => Array(cols));

function CreatePuzzlePieces () {
  PuzzleImageContainer.innerHTML = ''
  initialState.forEach((row, rowIndex) => {
    row.forEach((element, colIndex) => {
      counter++;
      const puzgame = document.createElement('li');
      puzgame.classList.add(
        'grid-item',
        'bg-white',
        'absolute',
        'rounded-lg',
        'text-black',
        'w-[150px]',
        'h-[150px]',
        'tallscreen:w-[125px]',
        'tallscreen:h-[125px]',
        'm-1',
        'p-2',
        'no-repeat',
        'transition',
        'duration-300',
        'border-4',
        'opacity-80',
        'hover:opacity-100',
        'pointer-cursor'
      );

      puzgame.setAttribute('data-id', element);

      const row = rowIndex;
      const col = colIndex;
      grid[row][col] = puzgame;
      puzzlePieces[row][col] = puzgame;
      initialPositions[row][col] = { row, col }; 
      puzgame.style.left = `${col * 155}px`;
      puzgame.style.top = `${row * 155}px`;
      puzgame.style.backgroundImage = `url("${last}")`;
      const backgroundPositionX = `-${colIndex * 150}px`;
      const backgroundPositionY = `-${rowIndex * 150}px`;
      puzgame.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
      PuzzleImageContainer.appendChild(puzgame);

        
      if (element === 1) {
        hiddenElement = puzgame
        hiddenElement.classList.add('hidden')
      }
    });
  });
  
}

dropButton.addEventListener('click', function(){
  dropList.classList.toggle('hidden')
 
})

tree.addEventListener('click', function(){
  dropList.classList.add('hidden')
  dropButton.classList.add('hidden')
  PuzzleImageContainer.classList.remove('pointer-events-none')
  PuzzleImageContainer.classList.add('cursor-pointer')
  shuffletext.classList.add('hidden')
  shuffle()
  //start shuffle 
  
})

thirty.addEventListener('click', function(){
  dropList.classList.add('hidden')
  dropButton.classList.add('hidden')
  PuzzleImageContainer.classList.remove('pointer-events-none')
  PuzzleImageContainer.classList.add('cursor-pointer')
  shuffletext.classList.add('hidden')
  shuffle()
  
  //Start shuffle
})



// Create a function that will compare puzzlePieces[pieces] are in the same cordinates as as grid[pieces] if piece is border color = green, not then border color == red

let listofMoves = [[0, 0]]



 // const hiddenElement = document.querySelector('[data-id="1"]');
  //hiddenElement.classList.add('hidden');
  function workingPuzzle() {
    puzzlePieces.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        element.addEventListener('click', () => {
          let targetRow = findElementPosition(element).row;
          let targetCol = findElementPosition(element).col;
          let currentRow = findElementPosition(hiddenElement).row;
          let currentCol = findElementPosition(hiddenElement).col;
  
          if (
            (Math.abs(targetRow - currentRow) === 1 && targetCol === currentCol) ||
            (Math.abs(targetCol - currentCol) === 1 && targetRow === currentRow)
          ) {
           
            const tempElement = puzzlePieces[currentRow][currentCol];
            puzzlePieces[currentRow][currentCol] = puzzlePieces[targetRow][targetCol];
            puzzlePieces[targetRow][targetCol] = tempElement;

            element.style.transition = 'top 0.5s, left 0.5s';
            tempElement.style.transition = 'top 0.5s, left 0.5s';
  
            const tempTop = tempElement.style.top;
            const tempLeft = tempElement.style.left;
            tempElement.style.top = element.style.top;
            tempElement.style.left = element.style.left;
            element.style.top = tempTop;
            element.style.left = tempLeft;

            setTimeout(() => {
              element.style.transition = '';
              tempElement.style.transition = '';
            }, 500); // 500ms is the duration of the transition
  
            
            currentRow = targetRow;
            currentCol = targetCol;
            compare()
            console.log(get_possible_moves())

            let move = [targetRow, targetCol]

            listofMoves.push(move)
            
           
            
            

          }
        });
      });
    });
  }
  
 


  function findElementPosition(element) {
    for (let row = 0; row < puzzlePieces.length; row++) {
      for (let col = 0; col < puzzlePieces[row].length; col++) {
        if (puzzlePieces[row][col] === element) {
          return {row, col} ;
        }
      }
    }
    
    return { row: -1, col: -1 };
  }
  
  

  function compare() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === puzzlePieces[i][j]) {
          puzzlePieces[i][j].style.borderColor = 'green';
        } else {
          puzzlePieces[i][j].style.borderColor = 'red';
        }
      }
    }
  }
  
// Store the ONLY last move 
let possible_moves = []

// last_move initial = 0, 0, after that findElementPos is the lastmove




function get_possible_moves() {

  // if last move in the possible_moves remove
  
  possible_moves.splice(0, possible_moves.length)
 
   
  let row =  findElementPosition(hiddenElement).row
  let col = findElementPosition(hiddenElement).col

  if (row === 1) {
    possible_moves.push([row - 1, col], [row + 1, col])
  } else if (row < 1) {
    possible_moves.push([row + 1, col])
  } else {
    possible_moves.push([row - 1, col])
  }

  if (col === 1) {
    possible_moves.push([row, col - 1], [row, col + 1])
  } else if (col < 1) {
    possible_moves.push([row, col  + 1])
  } else {
    possible_moves.push([row, col  - 1])
  }
  

  

  for (let i = 0; i < possible_moves.length; i++) {
    let isEqual = true;
  
    for (let j = 0; j < possible_moves[i].length; j++) {
      if (possible_moves[i][j] !== listofMoves[listofMoves.length - 1][j]) {
        isEqual = false;
        break;
      }
    }
  
    if (isEqual) {
      possible_moves.splice(i, 1);
      i--;

    } else {
      
    }
  }

  let randomnum =  possible_moves[Math.floor(Math.random() * possible_moves.length)]

  
  return randomnum; 
  
}


function shuffle() {
  let randomnum =  possible_moves[Math.floor(Math.random() * possible_moves.length)]
  let j = 3

while (j !== 0 ) {

    let targetRow = findElementPosition(randomnum).row;
    let targetCol = findElementPosition(randomnum).col;
    let currentRow = findElementPosition(hiddenElement).row;
    let currentCol = findElementPosition(hiddenElement).col;

      let tempoElement = puzzlePieces[currentRow][currentCol];
      puzzlePieces[currentRow][currentCol] = puzzlePieces[targetRow][targetCol];
      puzzlePieces[targetRow][targetCol] = tempoElement;

      randomnum.style.transition = 'top 0.5s, left 0.5s';
      tempoElement.style.transition = 'top 0.5s, left 0.5s';

      let tempoTop = tempoElement.style.top;
      let tempoLeft = tempoElement.style.left;
      tempoElement.style.top = randomnum.style.top;
      tempoElement.style.left = randomnum.style.left;
      randomnum.style.top = tempoTop;
      randomnum.style.left = tempoLeft;

      setTimeout(() => {
        randomnum.style.transition = '';
        tempoElement.style.transition = '';
      }, 500); // 500ms is the duration of the transition

      
      currentRow = targetRow;
      currentCol = targetCol;
      j--;
    
    }

      
     
      
      

    


}



// pick random move from possible_moves
// Shuffle 3 times 

// Pick random move from ...
// Shuffle 30 times


// Checker function / After each swap > if all elements same like init pos, hide game, show congrts 


 



  

  

document.addEventListener("DOMContentLoaded", slider);
