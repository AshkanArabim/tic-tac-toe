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

    function win(sign) {
        alert(`Player ${sign} won!`);
    }

    const gameboard = (function () {
        let _board = [null,null,null,null,null,null,null,null,null];

        function _hasWon() {
            function ThreeEq(a,b,c) {
                if (
                    a !== null &&
                    (a === b &&
                    b === c &&
                    c === a)
                ) {
                    return true;
                } else {
                    return false;
                };
            }

            if(
                ThreeEq(_board[0], _board[1], _board[2]) ||
                ThreeEq(_board[3], _board[4], _board[5]) ||
                ThreeEq(_board[6], _board[7], _board[8]) ||
                ThreeEq(_board[0], _board[3], _board[6]) ||
                ThreeEq(_board[1], _board[4], _board[5]) ||
                ThreeEq(_board[2], _board[5], _board[8]) ||
                ThreeEq(_board[0], _board[4], _board[8]) ||
                ThreeEq(_board[2], _board[4], _board[6])
            ) {
                return true;
            } else {
                return false;
            }
        }

        function _boardFull() {
            if (!(_board.includes(null))) {
                return true;
            } else {
                return false;
            }
        }

        function restart() {
            for (let cellIndex in cells) {
                cells[cellIndex].classList.remove('x');
                cells[cellIndex].classList.remove('o');
                _board = [null,null,null,null,null,null,null,null,null];
                turn = 'x'; 
            }
        }
    
        function board () {
            return [..._board];
        }
    
        function _render () {
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
            _render()

            if (_hasWon()) {
                win(sign);
            } else if (_boardFull()) {
                alert('board full')
            }
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