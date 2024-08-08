const player = (name, marker) => {
    let pname = name;
    let pmarker = marker;
    return { pname, pmarker };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getboard = () => board;

    const updateboard = (marker, index) => {
        if (board[index] === '') {
            board[index] = marker;
        } else {
            console.log('Please choose another space');
        }
    };

    const checkgame = () => {
        // Rows
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
            return true;
        }
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {
            return true;
        }
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {
            return true;
        }

        // Columns
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {
            return true;
        }
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {
            return true;
        }
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {
            return true;
        }

        // Diagonals
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {
            return true;
        }
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {
            return true;
        }
        
        if (!board.includes('')) {
        console.log('It\'s a tie!');
        return false; // Indicate that the game is over due to a tie
    }
        return false;
    };

    return { getboard, updateboard, checkgame };
})();

const gamecontroller = (() => {
    const players = [player("player1", "X"), player("player2", "O")];
    let currentplayer = 0;

    const switchPlayer = () => {
        currentplayer = currentplayer === 0 ? 1 : 0;
    };

    // Destructuring the methods from gameBoard
    const { updateboard, getboard, checkgame } = gameBoard;

    // Display the current board state
    console.log(getboard());

    // Example: Player makes a move at index 0
    updateboard(players[currentplayer].pmarker, 0);

    // Check if the current player has won
    if (checkgame()) {
        console.log(players[currentplayer].pname + ' wins!');
    } else {
        switchPlayer();
    }

    // Display the board after the move
    console.log(getboard());

    // Example: Next player makes a move at index 1
    updateboard(players[currentplayer].pmarker, 4);

    // Check if the current player has won
    if (checkgame()) {
        console.log(players[currentplayer].pname + ' wins!');
    } else {
        switchPlayer();
    }

    // Display the board after the second move
    console.log(getboard());

    // Example: Next player makes a move at index 2
    updateboard(players[currentplayer].pmarker, 1);

    // Check if the current player has won
    if (checkgame()) {
        console.log(players[currentplayer].pname + ' wins!');
    } else {
        switchPlayer();
    }

    // Display the board after the third move
    console.log(getboard());
    
     updateboard(players[currentplayer].pmarker, 5);

    // Check if the current player has won
    if (checkgame()) {
        console.log(players[currentplayer].pname + ' wins!');
    } else {
        switchPlayer();
    }

    // Display the board after the third move
    console.log(getboard());

     updateboard(players[currentplayer].pmarker, 2);

    // Check if the current player has won
    if (checkgame()) {
        console.log(players[currentplayer].pname + ' wins!');
    } else {
        switchPlayer();
    }

    // Display the board after the third move
    console.log(getboard());
})();


document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('.dialog').showModal();
});

document.querySelector('.game').addEventListener('click', () => {
    document.querySelector('.dialog').close();

    const p1name = document.querySelector('#player1').value;
    const p2name = document.querySelector('#player2').value;

    const main = document.querySelector('.main');
    main.innerHTML = ''; // Clear the main content

    // Add the player names
    main.innerHTML = `<h1>${p1name} vs ${p2name}</h1>`;

    // Add the game board
    main.innerHTML += `
        <div class="board">
            <div class="box box1" data-value="0"></div>
            <div class="box box2" data-value="1"></div>
            <div class="box box3" data-value="2"></div>
            <div class="box box4" data-value="3"></div>
            <div class="box box5" data-value="4"></div>
            <div class="box box6" data-value="5"></div>
            <div class="box box7" data-value="6"></div>
            <div class="box box8" data-value="7"></div>
            <div class="box box9" data-value="8"></div>
        </div>`;
});
