// Update board array only
const gameBoard = (() => {
    const _board = new Array(9).fill("");
    console.log(_board);
    return { _board };
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
    return {getCurrentMaker, swapTurn};
})();

// Update DOM display
const displayController = (() => {
    const squareBox = document.querySelectorAll(".square-box");

    const displayMarker = (event) => {
        gameFlow.swapTurn();
        return event.target.classList.add(gameFlow.getCurrentMaker());
    }

    squareBox.forEach(box => box.addEventListener("click", displayMarker));
})();