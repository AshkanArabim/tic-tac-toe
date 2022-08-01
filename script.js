const game = (function () {
    let turn = 'x'
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
    
        function addmark (xOrO, clickedCell) {
            // if () {
            //     return
            // } else {
            //     cells[clickedCell].classList.add(xOrO);
            // }

            //incomplete
    
            render()
        }
    
        return {board, addmark};
    }) ();

    function switchTurn () {
        if (turn === 'x') {
            turn = 'o';
        } else if (turn === 'o') {
            turn = 'x';
        }
    }

    for (let cellIndex in cells) {
        console.log(`length of cells: ${cells.length}`)
        console.log(`cell index: ${cellIndex}`)
        console.log(`cellIndex in cells: ${cells[cellIndex]}`)
        console.log('-----------------')

        cells[cellIndex].addEventListener('click', (turn) => {
            alert('lol') //check if addEventListener works
            gameboard.addmark(turn, cellIndex);
            switchTurn()
        })
    }

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