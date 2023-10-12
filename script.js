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

const initialState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9], // 0 represents the empty space
  ];
  


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

const rows = initialState.length;
const cols = initialState[0].length;
const grid = Array.from({ length: rows }, () => Array(cols));
initialState.forEach((row, rowIndex) => {
  row.forEach((element, colIndex) => {
    const puzgame = document.createElement("li");
    puzgame.classList.add(
      "grid-item",
      "bg-white",
      "absolute",
      "rounded-lg",
      "text-black",
      "w-[150px]",
      "h-[150px]",
      "tallscreen:w-[120px]",
      "tallscreen:h-[120px]",
      "m-1",
      "p-2",
      "no-repeat"

    );


    if (element !== 1) {
      puzgame.innerText = element;
    } else {
      // If the element is 0 (empty space), you can add a special class or style
      puzgame.classList.add("hidden");
    }
   
    

    const row = rowIndex;
    const col = colIndex;
    grid[row][col] = puzgame;
    puzgame.style.left = `${col * 155}px`;
    puzgame.style.top = `${row * 155}px`;
    puzgame.style.backgroundImage = "url('dog.jpeg')";
    const backgroundPositionX = `-${colIndex * 150}px`;
    const backgroundPositionY = `-${rowIndex * 150}px`;
    puzgame.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
    

     // Add click event listener for swapping
     puzgame.addEventListener("click", () => {
      let move = [rowIndex, colIndex]

        swapElements(rowIndex, colIndex)
        move = [rowIndex, colIndex]
        console.log(grid)
 
      
    
    });

    PuzzleImageContainer.appendChild(puzgame);
  });

});


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



document.getElementById("shuffle-dropdown").addEventListener("click", function () {
    const menu = document.getElementById("shuffle-menu");
    menu.classList.toggle("hidden");
  });
  

  document.addEventListener("click", function (event) {
    const menu = document.getElementById("shuffle-menu");
    if (!event.target.matches("#shuffle-dropdown")) {
      menu.classList.add("hidden");
    }
  });
  
const puzzle = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]

function find_memo(arr) {
    let found = false; 
    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] === 0) {
                return {row, col}
            }
        }
    }
}
function valid(arr, [row, col]){
  const memo = find_memo(arr)
   if (memo === null){
       return false;
   }

   return (
       (Math.abs(memo.row - row) === 1 && memo.col === col) ||
       (Math.abs(memo.col - col) === 1 && memo.row == row)
   );
}


function swap(arr, [row, col]) {
  if (valid(arr, [row, col])) {
    const memo = find_memo(arr);
    const temp = arr[row][col];
    arr[row][col] = arr[memo.row][memo.col];
    arr[memo.row][memo.col] = temp;

    // Update the grid and displayed numbers on the tiles
    grid[row][col].innerText = temp;
    grid[memo.row][memo.col].innerText = "";
    return row, col;
  }
}

function swapElements(row, col) {
  const emptyPosition = findEmptyPosition(grid);
  if (emptyPosition) {
    const clickedElement = grid[row][col];
    const emptyElement = grid[emptyPosition.row][emptyPosition.col];

    grid[row][col] = emptyElement;
    grid[emptyPosition.row][emptyPosition.col] = clickedElement;

    const emptyLeft = emptyElement.style.left;
    const emptyTop = emptyElement.style.top;
    emptyElement.style.left = clickedElement.style.left;
    emptyElement.style.top = clickedElement.style.top;
    clickedElement.style.left = emptyLeft;
    clickedElement.style.top = emptyTop;

    // Update the class names for swapping
  }
}

function poss(arr) {
    const memas = find_memo(arr);
    const row = memas.row;
    const col = memas.col + 1;
    const tmp = arr[row][col];
    
    
}
poss(puzzle)

function findEmptyPosition(grid) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].innerText === "") {
          return { row, col };
        }
      }
    }
    return null; // Return null if no empty position is found (which should not happen in your case)
  }
  



document.addEventListener("DOMContentLoaded", slider);
