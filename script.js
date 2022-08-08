const game = (function () {
    const cells = Array.from(document.querySelectorAll('.game div'));
    const beginBtn = document.querySelector('.profile-holder>div:nth-child(2)>button');
    const mainMenu = document.querySelector('.main-menu');
    const restartBtn = document.getElementById('restart');
    let turn = 'x'

    const player = (function() {
        const signs = ['x','o'];

        function funcAssign(type, sign) {
            if (type === 'human') {
                return function() {
                }
            } else if (type === 'AI1') {
                return function() {
                    gameboard.addmark(sign, gameboard.randomFromUnchecked())
                }
            } else if (type === 'AI2') {
                //ai 2
            } else if (type === 'AI3') {
                //ai 3
            }
        }

        for (let playerIndex in signs) {
            window[signs[playerIndex]] = (function() {
                const humanBtn = document.querySelector(`#${signs[playerIndex]}human`);
                const botBtn = document.querySelector(`#${signs[playerIndex]}bot`);
                const sign = signs[playerIndex];
                let type = 'human';
                let fx = funcAssign(type, sign);
                humanBtn.addEventListener('click', () => {
                    type = 'human';
                    fx = funcAssign(type, sign);
                });
                botBtn.addEventListener('click', () => {
                    type = 'AI1';
                    fx = funcAssign(type, sign);
                })
                document.addEventListener('click', () => {
                    if (turn === sign) {
                        fx();
                    }
                })
            }) ();
        }
    }) ();

    const login = (function() {
        beginBtn.addEventListener('click', () => {
            mainMenu.classList.add('hidden');
        })

        restartBtn.addEventListener('click', () => {
            gameboard.restart();
            gameAlert(false, '');
        })
    }) ();

    function switchTurn (sign) {
        const xlight = document.querySelector('.xinfo');
        const olight = document.querySelector('.oinfo');

        if ((sign === 'x') || (sign === undefined && turn === 'o')) {
            turn = 'x';
            olight.classList.remove('turn');
            xlight.classList.add('turn');
        } else if ((sign === 'o') || (sign === undefined && turn === 'x')) {
            turn = 'o';
            xlight.classList.remove('turn');
            olight.classList.add('turn');
        } else if (sign === 'static') {
            turn = 'static';
        }
    }

    function gameAlert(appear, text) {
        const cover = document.querySelector('.congrats');
        cover.textContent = text;

        if (appear === true) {
            cover.classList.remove('hidden');
        } else if (appear === false) {
            cover.classList.add('hidden');
        }
    }

    function win(sign) {
        gameAlert(true, `Player ${sign.toUpperCase()} won!`);
        switchTurn('static');
    }

    function tie() {
        gameAlert(true, 'Tie!');
        switchTurn('static');
    }

    const gameboard = (function () {
        let _board = [null,null,null,null,null,null,null,null,null];

        function randomFromUnchecked() {
            function getAllIndexes(arr, val) {
                var indexes = [], i;
                for(i = 0; i < arr.length; i++)
                    if (arr[i] === val)
                        indexes.push(i);
                return indexes;
            }

            let indexes = getAllIndexes(_board, null);
            return indexes[(Math.floor((Math.random())*indexes.length))];
        }

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
                ThreeEq(_board[1], _board[4], _board[7]) ||
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
            }
            _board = [null,null,null,null,null,null,null,null,null];
            switchTurn('x');
            mainMenu.classList.remove('hidden');
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
            _render()
            if (_hasWon()) {
                win(sign);
            } else if (_boardFull()) {
                tie();
            }
            switchTurn()
        }
    
        return {addmark, restart, randomFromUnchecked};
    }) ();

    for (let cellIndex in cells) {
        cells[cellIndex].addEventListener('click', () => {
            gameboard.addmark(turn, cellIndex);
        })
    }

    return;
}) ();