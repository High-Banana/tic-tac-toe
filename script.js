const gameBoard = (() => {
    const _board = new Array(9).fill("");
    console.log(_board);
    return { _board };
})();

const gameFlow = (() => {
    let currentMarker;
    let toggleCircle;
    const swapTurn = () => {
        toggleCircle = false;
        currentMarker = toggleCircle ? "cross" : "circle";
    }
    return {swapTurn};
})();

const displayController = (() => {
    const squareBox = document.querySelectorAll(".square-box");

    const displayMarker = (event) => {
        return event.target.classList.add("cross");
    }

    squareBox.forEach(box => box.addEventListener("click", displayMarker));
})();