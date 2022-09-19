let $ = document ;
const board              = $.querySelector('.board');
const cellElements       = $.querySelectorAll('[data-cell]');
const winningMessage     = $.querySelector('[data-winning-message-text]');
const winningMessageElem = $.querySelector('.winning-message');
const restartButton      = $.querySelector('#restartButton');
const Xclass             = 'x';
const CircleClass        = 'circle';
let circleTurn ;
const winningArry = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell =>{
    cell.classList.remove(Xclass);
    cell.classList.remove(CircleClass);
    cell.classList.remove('active');
    cell.addEventListener('click',handlerClick , {once : true})
    })
    setBoardHoverClass()
    winningMessageElem.classList.remove('show');
}

function handlerClick(e) {
    // placeMark 
    // check for win
    // check for Draw
    // swich Turns

    const cell = e.target ;
    const currentClass = circleTurn ? CircleClass : Xclass ;
    placeMark(cell , currentClass);
    

    if (checkWin(currentClass)) {
        gameEnd(false);
    }else if(isDraw()){
        gameEnd(true);
    }else{
        swapTurns();
        setBoardHoverClass();
    }

}
function placeMark(cell , currentClass) {
    cell.classList.add(currentClass);
    cell.classList.add('active')
}
function swapTurns() {
    circleTurn = !circleTurn ;
}
function setBoardHoverClass() {
    board.classList.remove(Xclass);
    board.classList.remove(CircleClass);

    if (circleTurn) {
        board.classList.add(CircleClass);
    }else{
        board.classList.add(Xclass);
    }
}
function checkWin(currentClass) {
    return winningArry.some(combimation => {
        return combimation.every( index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function gameEnd(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        winningMessage.innerText = `${circleTurn ? "O": "X" } Wins!`
    }
    winningMessageElem.classList.add('show');
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(Xclass) || cell.classList.contains(CircleClass)
    })
}
restartButton.addEventListener('click', startGame);
startGame();