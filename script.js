const squareBox = document.querySelectorAll(".square-box");

// Update board array only
const gameBoard = (() => {
    const _board = new Array(9).fill("");

    const getBoard = () => _board;

    const updateBoard = (index, currentMarker) => {
        _board[index] = currentMarker;
        console.log(_board);
    }

    return { getBoard, updateBoard };
})();

// Run game
const gameFlow = (() => {
    let currentMarker;
    let toggleCircle;

    const getCurrentMaker = () => currentMarker;

    const swapTurn = () => {
        toggleCircle = !toggleCircle;
        currentMarker = toggleCircle ? "circle" : "cross";
    }

    const _WINNING_COMBINATION = [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWinner = (board) => {
        for (let i = 0; i < _WINNING_COMBINATION.length; i++) {
            const [a, b, c] = _WINNING_COMBINATION[i];
            if(board[a] && board[b] === board[c] && board[a] === board[c]){
                return true;
            }
        }
    }

    const checkTie = (board) => {
        return board.every(box => box !== "");
    }

    return { getCurrentMaker, swapTurn, checkWinner, checkTie };
})();

// Update DOM display
const displayController = (() => {
    const displayMarker = (event, index) => {
        gameFlow.swapTurn();
        gameBoard.updateBoard(index, gameFlow.getCurrentMaker());
        return event.classList.add(gameFlow.getCurrentMaker());
    }

    const board = gameBoard.getBoard();
    const displayGameResult = () => {
        if(gameFlow.checkWinner(board)){
            console.log("winner");
        }else if(gameFlow.checkTie(gameBoard.getBoard())){
            console.log("It's a draw");
        }
    }
    
    squareBox.forEach((box, index) => box.addEventListener("click", () => {
        displayMarker(box, index);
        displayGameResult();
    }, { once: true }));
})();