// Update board array only
const gameBoard = (() => {
    const _board = new Array(9).fill("");

    const getBoard = () => _board;

    const updateBoard = (index, currentMarker) => {
        _board[index] = currentMarker;
    }

    return { getBoard, updateBoard };
})();

// Run game
const gameFlow = (() => {
    let currentMarker;
    let toggleCircle;

    const getCurrentMaker = () => currentMarker;

    const startNewGame = () => {
        toggleCircle = false;
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            gameBoard.updateBoard(i, "");
        }
    }

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
            if (board[a] && board[b] === board[c] && board[a] === board[c]) {
                return true;
            }
        }
    }

    const checkTie = (board) => {
        return board.every(box => box !== "");
    }

    return { getCurrentMaker, swapTurn, checkWinner, checkTie, startNewGame };
})();

// Update DOM display
const displayController = (() => {
    const squareBox = document.querySelectorAll(".square-box");
    const board = gameBoard.getBoard();
    const endGamePopup = document.querySelector(".endGame-popup");
    const gameMessage = document.querySelector(".game-message");

    const getSquareBox = () => squareBox;

    const displayMarker = (event, index) => {
        if(event.classList.contains("circle") || event.classList.contains("cross")) return;
        gameFlow.swapTurn();
        gameBoard.updateBoard(index, gameFlow.getCurrentMaker());
        return event.classList.add(gameFlow.getCurrentMaker());
    }

    const getWinner = (winner) => {
        if (winner) {
            const winner = gameFlow.getCurrentMaker() === "circle" ? "O" : "X";
            gameMessage.textContent = `${winner} won!`;
        } else {
            gameMessage.textContent = "It's a draw!";
        }
        endGamePopup.classList.add("show");
    }

    const displayGameResult = () => {
        if (gameFlow.checkWinner(board)) {
            getWinner(true);
        } else if (gameFlow.checkTie(board)) {
            getWinner(false);
        }
    }

    const resetDisplay = () => {
        gameFlow.startNewGame();
        endGamePopup.classList.remove("show");
        squareBox.forEach((box) => {
            box.classList.remove("circle");
            box.classList.remove("cross");
        })
    }

    return { displayMarker, displayGameResult, getSquareBox, resetDisplay };
})();

displayController.getSquareBox().forEach((box, index) => box.addEventListener("click", () => {
    displayController.displayMarker(box, index);
    displayController.displayGameResult();
}));

const restartButton = document.querySelectorAll(".restartButton");

restartButton.forEach(button => button.addEventListener("click", () => {
    displayController.resetDisplay();
}));