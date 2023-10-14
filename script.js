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

let countdown;
let count = 4;


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


startButton.addEventListener('click', function (){
   mainContainer.classList.add('hidden')
   gameContainer.classList.remove('hidden')
   clearInterval(countdown)
   puzzleStart.classList.add("hidden")
})





let last = []
let lastitem;

pickButton.forEach((btn) => {
    btn.addEventListener('click', function () {
        puzzleStart.classList.remove("hidden")
        btn.classList.add('selected')
        last.push(btn)
        lastitem = last[last.length - 1]
        
    })

})


const doggie_img = document.createElement('img')
doggie_img.src = '/build/img/dog.jpeg'
doggie_img.className = 'image-container   rounded-lg'

const cat_img = document.createElement('img')
cat_img.src = '/build/img/cat.jpeg'
cat_img.className = ' image-container   rounded-lg'

const panda_img = document.createElement('img')
panda_img.src = '/build/img/panda.jpeg'
panda_img.className = 'image-container  rounded-lg'



gameStartButton.addEventListener('click', function(){
    gameContainer.classList.add('hidden')
    puzzleContainer.classList.remove('hidden')
})


let counter = 0; 

  const initialState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const rows = initialState.length;
  const cols = initialState[0].length;

  const grid = Array.from({ length: rows }, () => Array(cols));

  const puzzlePieces = Array.from({ length: rows }, () => Array(cols));

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
        'duration-300'
      );

      puzgame.setAttribute('data-id', element);

      const row = rowIndex;
      const col = colIndex;
      grid[row][col] = puzgame;
      puzzlePieces[row][col] = puzgame; 
      puzgame.style.left = `${col * 130}px`;
      puzgame.style.top = `${row * 130}px`;
      puzgame.style.backgroundImage = "url('dog.jpeg')";
      const backgroundPositionX = `-${colIndex * 150}px`;
      const backgroundPositionY = `-${rowIndex * 150}px`;
      puzgame.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
      PuzzleImageContainer.appendChild(puzgame);
    });
  });

  const hiddenElement = document.querySelector('[data-id="1"]');
  hiddenElement.classList.add('hidden');

 
  puzzlePieces.forEach((row, rowIndex) => {
    row.forEach((element, colIndex) => {
      element.addEventListener('click', () => {
        const targetRow = findElementPosition(element).row;
        const targetCol = findElementPosition(element).col;

        
        const hiddenRow = findElementPosition(hiddenElement).row;
        const hiddenCol = findElementPosition(hiddenElement).col;

        
        if (
          (Math.abs(targetRow - hiddenRow) === 1 && targetCol === hiddenCol) ||
          (Math.abs(targetCol - hiddenCol) === 1 && targetRow === hiddenRow)
        ) {
          
          [puzzlePieces[hiddenRow][hiddenCol], puzzlePieces[targetRow][targetCol]] = [
            puzzlePieces[targetRow][targetCol],
            puzzlePieces[hiddenRow][hiddenCol],
          ];

          
          const tempTop = puzzlePieces[hiddenRow][hiddenCol].style.top;
          const tempLeft = puzzlePieces[hiddenRow][hiddenCol].style.left;
          puzzlePieces[hiddenRow][hiddenCol].style.top = puzzlePieces[targetRow][targetCol].style.top;
          puzzlePieces[hiddenRow][hiddenCol].style.left = puzzlePieces[targetRow][targetCol].style.left;
          puzzlePieces[targetRow][targetCol].style.top = tempTop;
          puzzlePieces[targetRow][targetCol].style.left = tempLeft;

          
          [hiddenRow, hiddenCol] = [targetRow, targetCol];
        }
      });
    });
  });

  function findElementPosition(element) {
    for (let row = 0; row < puzzlePieces.length; row++) {
      for (let col = 0; col < puzzlePieces[row].length; col++) {
        if (puzzlePieces[row][col] === element) {
          return { row, col };
        }
      }
    }
    
    return { row: -1, col: -1 };
  }
  
  



document.addEventListener("DOMContentLoaded", slider);
