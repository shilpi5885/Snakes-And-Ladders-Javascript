const noPlay = 0;
const ladder = 1;
const snake = 2;
const winPosition = 100;

let diceRolls = 0;
let currentPositionPlayer1 = 0;
let currentPositionPlayer2 = 0;
let diceValue = 0;
let currentPlayer = -1;
let player1Position = 0;
let player2Position = 0;
let ladderValue = 10;
let snakeValue = 7;

function startGame() {
    do {
        diceValue = diceThrow();
        if (currentPlayer === -1) {
            console.log("FIRST PLAYER\'S TURN");
            currentPositionPlayer1 = updatePlayerPosition(player1Position, diceValue);
            player1Position = currentPositionPlayer1;
            console.log("Position of first player: " + currentPositionPlayer1);
            if (isWin(player1Position)) {
                console.log("First player wins");
                console.log("Dice is thrown " + diceRolls + " times.");
                return;
            }
        }
        else {
            console.log("SECOND PLAYER\'S TURN");
            currentPositionPlayer2 = updatePlayerPosition(player2Position, diceValue);
            player2Position = currentPositionPlayer2;
            if (player2Position > 100) {
                player2Position = player2Position - diceValue;
                diceValue = diceThrow();
                player2Position = player2Position + diceValue;
            }
            console.log("Position of second player: " + currentPositionPlayer2);
            if (isWin(player2Position)) {
                console.log("Second player wins");
                console.log("Dice is thrown " + diceRolls + " times.");
                return;
            }
        }   
        currentPlayer = -currentPlayer;
    } while ((currentPositionPlayer1 <= winPosition && currentPositionPlayer2 <= winPosition));
}

function updatePlayerPosition(position, diceValue) {
    let option = Math.floor(Math.random() * 1);;
    switch ((option)) {
        case 0 /* No Play */:
            position = position + diceValue;
            if (position > 100) {
                position = position - diceValue;
            }
            break;
        case 1 /* Ladder */:
            console.log("Congrats, You got a ladder! :)");
            position = position + diceValue + ladderValue;
            if (position > 100) {
                position = position - diceValue - ladderValue;
            }
            break;
        case 2 /* Snake */:
            console.log("Too bad, bitten by a snake :(");
            position = position + diceValue - snakeValue;
            break;
        default:
    }   
    return position;
}
function isWin(position) {
    return winPosition === position;
}
function diceThrow() {
    var diceValue = ((Math.random() * (6 - 1)) | 0) + 1;
    diceRolls++;
    return diceValue;
}
module.exports = {startGame};