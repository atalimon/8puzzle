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

let randomnumber = []




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
        'tallscreen:w-[130px]',
        'tallscreen:h-[130px]',
        'tallscreen:m-0',
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
      //puzgame.style.left = `${col * 155}px`;
      //puzgame.style.top = `${row * 155}px`;

function setLeftTopStyles() {
  if (window.matchMedia('(min-width: 640px)').matches) {

    puzgame.style.left = `${col * 155}px`;
    puzgame.style.top = `${row * 155}px`;
  } else {

    puzgame.style.left = `${col * 135}px`;
    puzgame.style.top = `${row * 135}px`;
  }
}


setLeftTopStyles();


const mediaQuery = window.matchMedia('(min-width: 640px)');
mediaQuery.addEventListener('change',setLeftTopStyles);
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

function runLoop(j) {
  if (j === 0) {
    return;
  }

  
  shuffle(() => {
    console.log(j);
    j--;


    setTimeout(() => runLoop(j), 1000);
  });
}

tree.addEventListener('click', function(){
  dropList.classList.add('hidden')
  dropButton.classList.add('hidden')
  PuzzleImageContainer.classList.remove('pointer-events-none')
  PuzzleImageContainer.classList.add('cursor-pointer')
  shuffletext.classList.add('hidden')

  let initialJJ = 3
  runLoop(initialJJ)

})

thirty.addEventListener('click', function(){
  dropList.classList.add('hidden')
  dropButton.classList.add('hidden')
  PuzzleImageContainer.classList.remove('pointer-events-none')
  PuzzleImageContainer.classList.add('cursor-pointer')
  shuffletext.classList.add('hidden')

  let initialJ = 30
runLoop(initialJ);


})









let listofMoves = [[0,0], [0,0]]
let possible_moves = []
let new_possible = []

let counterofusermoves = 0

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
            }, 500); 
  
            
            currentRow = targetRow;
            currentCol = targetCol;
            compare()
            complete()
            
            console.log(new_possible)

            let move = [targetRow, targetCol]

            listofMoves.push(move)
            counterofusermoves++
            console.log(counterofusermoves)
            

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

// complete this
function complete() {
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== puzzlePieces[i][j]) {
        // If any element is not equal, exit the function
        return;
      }
    }
  }


  puzzleContainer.classList.add('hidden');
  congrats.classList.remove('hidden');
}


  
// Store the ONLY last move 


// last_move initial = 0, 0, after that findElementPos is the lastmove




function getRandomMove() {
  // if last move in the possible_moves, remove
  possible_moves.splice(0, possible_moves.length);

  let row = findElementPosition(hiddenElement).row;
  let col = findElementPosition(hiddenElement).col;

  if (row === 1) {
      possible_moves.push([row - 1, col], [row + 1, col]);
  } else if (row === 0) {
      possible_moves.push([row + 1, col]);
  } else if (row === 2) {
      possible_moves.push([row - 1, col]);
  }

  if (col === 1) {
      possible_moves.push([row, col - 1], [row, col + 1]);
  } else if (col === 0) {
      possible_moves.push([row, col + 1]);
  } else if (col === 2) {
      possible_moves.push([row, col - 1]);
  }

  let lastmove = listofMoves[listofMoves.length - 2];


  console.log('listofmoves', listofMoves)


  let filteredMoves = possible_moves.filter(move => {
      return !(move[0] === lastmove[0] && move[1] === lastmove[1]);
  });


  randomMove = filteredMoves[Math.floor(Math.random() * filteredMoves.length)];

  console.log("Random Move:", randomMove, 'filtered: ', filteredMoves);
}






function shuffle(callback) {
getRandomMove()

  let element = puzzlePieces[randomMove[0]][randomMove[1]];
  let targetRow = randomMove[0];
  let targetCol = randomMove[1];
  let currentRow = findElementPosition(hiddenElement).row;
  let currentCol = findElementPosition(hiddenElement).col;

  let tempElement = puzzlePieces[currentRow][currentCol];
  puzzlePieces[currentRow][currentCol] = puzzlePieces[targetRow][targetCol];
  puzzlePieces[targetRow][targetCol] = tempElement;

  element.style.transition = 'top 0.5s, left 0.5s';
  tempElement.style.transition = 'top 0.5s, left 0.5s';

  let tempTop = tempElement.style.top;
  let tempLeft = tempElement.style.left;
  tempElement.style.top = element.style.top;
  tempElement.style.left = element.style.left;
  element.style.top = tempTop;
  element.style.left = tempLeft;

  setTimeout(() => {
    element.style.transition = '';
    tempElement.style.transition = '';

    currentRow = targetRow;
    currentCol = targetCol;
    compare();

    let move = [targetRow, targetCol];

    listofMoves.push(move);

    
    if (callback) {
      callback();
    }
  }, 500); // 500ms is the duration of the transition
}




// pick random move from possible_moves
// Shuffle 3 times 

// Pick random move from ...
// Shuffle 30 times


// Checker function / After each swap > if all elements same like init pos, hide game, show congrts 


 



  

  

document.addEventListener("DOMContentLoaded", slider);
