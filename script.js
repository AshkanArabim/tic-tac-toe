const game = (function () {
    const cells = document.querySelectorAll('.game div');

    const gameboard = (function () {
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
    
        function addmark (xOrO, cellIndex) {
            if (cells[cellIndex]) {
                return
            } else {
                cells[cellIndex].classList.add(xOrO);
            }
    
            render()
        }
    
        return {board, addmark};
    }) ();
    
    function human(xOrO) {
        const sign = xOrO;
        return {sign};
    }

    function bot(xOrO) {
        const sign = xOrO;
        return {sign};
    }

    return {human, bot}
}) ();

const player1 = game.human('x');
const player2 = game.bot('o');