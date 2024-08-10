// Player factory function
const player = (name, marker) => {
    return { name, marker };
};

// Game board module
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (marker, index) => {
        if (board[index] === '') {
            board[index] = marker;
        } else {
            console.log('Please choose another space');
        }
    };

    const checkGame = () => {
        // Rows
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') return true;
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') return true;
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') return true;

        // Columns
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') return true;
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') return true;
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') return true;

        // Diagonals
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') return true;
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') return true;

        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, checkGame, resetBoard };
})();

// Game controller module
const gameController = (() => {
    let currentPlayerIndex = 0;
    let players = [];

    const initPlayers = (p1name, p2name) => {
        players = [player(p1name, "X"), player(p2name, "O")];
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    return { initPlayers, getCurrentPlayer, switchPlayer };
})();

// Event listener for the start button to show the dialog
document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('.dialog').showModal();
});

// Event listener for the dialog's start button
document.querySelector('.game').addEventListener('click', () => {
    document.querySelector('.dialog').close();

    const p1name = document.querySelector('#player1').value;
    const p2name = document.querySelector('#player2').value;

    gameController.initPlayers(p1name, p2name);

    const main = document.querySelector('.main');
    main.innerHTML = `<h1 class = 'diatit' >${p1name} vs ${p2name}</h1>
    <div class = 'par'>
        <div class="board">
            <div class="box" data-value="0"></div>
            <div class="box" data-value="1"></div>
            <div class="box" data-value="2"></div>
            <div class="box" data-value="3"></div>
            <div class="box" data-value="4"></div>
            <div class="box" data-value="5"></div>
            <div class="box" data-value="6"></div>
            <div class="box" data-value="7"></div>
            <div class="box" data-value="8"></div>
        </div>
    </div>

        `;

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', boxClick);
    });
});

// Function to handle box clicks
function boxClick(event) {
    const index = event.target.getAttribute('data-value');
    const marker = gameController.getCurrentPlayer().marker;

    if (gameBoard.getBoard()[index] === '') {
        gameBoard.updateBoard(marker, index);
        event.target.textContent = marker;
        event.target.style.color = marker === "X" ? "lightgreen" : "lightblue";
        event.target.style.textShadow = marker === "X" 
            ? "0 0 2px green, 0 0 2px green, 0 0 2px green"
            : "0 0 2px blue, 0 0 2px blue, 0 0 2px blue";

        if (gameBoard.checkGame()) {
            showEndDialog(`${gameController.getCurrentPlayer().name} wins!`);
        } else if (!gameBoard.getBoard().includes('')) {
            showEndDialog('It\'s a tie!');
        } else {
            gameController.switchPlayer();
        }
    } else {
        alert('This space is already taken. Choose another.');
    }
}

// Function to show the end game dialog
function showEndDialog(message) {
    const dialog = document.querySelector('.dialog2');
    dialog.querySelector('h1').textContent = message;
    dialog.showModal();
}

// Event listener for the replay button
document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.dialog2').close();
    resetGame();
});

// Event listener for the exit button
document.querySelector('.exit').addEventListener('click', () => {
    document.querySelector('.dialog2').close();
    resetToHomePage();
});

// Function to reset the game
function resetGame() {
    gameBoard.resetBoard();
    document.querySelectorAll('.box').forEach(box => {
        box.textContent = '';
    });
    gameController.switchPlayer();
}

// Function to reset to the home page
function resetToHomePage() {
    resetGame();
    const main = document.querySelector('.main');
    main.innerHTML = ` <div class = "moto">
    <h1>Start the game and enjoy with friends</h1>
    </div>
        <button id="start">Start</button>`;

    document.querySelector('#start').addEventListener('click', () => {
        document.querySelector('.dialog').showModal();
    });
}
