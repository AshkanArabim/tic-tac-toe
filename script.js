const gameboard = (function () {
    const cells = document.querySelectorAll('.game div');
    let _board = ['x','o','x','o','o','x','x','x','o'];

    function board () {
        return [..._board];
    }

    function render () {
        for (let cellIndex in cells) {
            if (_board[cellIndex] === 'x') {
                cells[cellIndex].classList.add('x');
            } else if (_board[cellIndex] === 'o') {
                cells[cellIndex].classList.add('o');
            };
        }
    }

    return {board, render};
}) ();



function human(xOrO) {
    const sign = xOrO;
    return {sign};
}

function bot(xOrO) {
    const sign = xOrO;
    return {sign};
}

const player1 = human('x');
const player2 = bot('o');
