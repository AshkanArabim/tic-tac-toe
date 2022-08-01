const game = (function () {
    let turn = 'x'
    const cells = Array.from(document.querySelectorAll('.game div'));
    const restartBtn = document.getElementById('restart');

    function switchTurn () {
        if (turn === 'x') {
            turn = 'o';
        } else if (turn === 'o') {
            turn = 'x';
        }
    }

    const gameboard = (function () {
        let _board = [null,null,null,null,null,null,null,null,null];

        function restart() {
            for (let cellIndex in cells) {
                cells[cellIndex].classList.remove('x');
                cells[cellIndex].classList.remove('o');
                _board = [null,null,null,null,null,null,null,null,null];
            }
        }
    
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
    
        function addmark (sign, clickedCell) {
            if (_board[clickedCell]) {
                return
            } else {
                cells[clickedCell].classList.toggle(sign);
                _board[clickedCell] = sign;
            }
            switchTurn()
            render()
        }
    
        return {board, addmark, restart};
    }) ();

    for (let cellIndex in cells) {
        cells[cellIndex].addEventListener('click', () => {
            gameboard.addmark(turn, cellIndex);
        })
    }

    restartBtn.addEventListener('click', () => {
        gameboard.restart()
    })

    function human(xOrO) {
        const sign = xOrO;
        return {sign};
    }

    function bot(xOrO) {
        const sign = xOrO;
        return {sign};
    }

    return {human, bot};
}) ();

const player1 = game.human('x');
const player2 = game.human('o');