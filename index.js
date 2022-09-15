const weaponButtons = document.querySelectorAll(".weapons-div .weapon");

const playerImage = document.querySelector(".players-div #player img");
const computerImage = document.querySelector(".players-div #computer img");

const resultMain = document.querySelector(".result-div h2");
const resultDef = document.querySelector(".result-div p");

const score = document.querySelector(".scorecard h2");
const finalResult = document.querySelector(".scorecard p");

const playAgainButton = document.querySelector(".play-again button");

var playerScore = 0;
var computerScore = 0;

var isGameEnded = false;

// 1 === rock 
// 2 === paper 
// 3 === scissors

weaponButtons.forEach(weapon => {
    weapon.addEventListener('click', () => {

        if (!isGameEnded) {

            const buttonName = weapon.getAttribute("id");

            switch (buttonName) {
                
                case "rock":
                    playerImage.setAttribute("src", "images/rock2.png");
                    playRound(1);
                    break;

                case "paper":
                    playerImage.setAttribute("src", "images/paper2.png");
                    playRound(2);
                    break;
                    
                case "scissors":
                    playerImage.setAttribute("src", "images/scissors2.png");
                    playRound(3);
                    break;
            }
        }
    });
});

playAgainButton.addEventListener('click', () => {
    playerImage.setAttribute("src", "images/player.png");
    computerImage.setAttribute("src", "images/computer.png");

    playerScore = 0;
    computerScore = 0;

    resultMain.textContent = "";
    resultDef.textContent = "";
    score.textContent = "Choose your weapon";
    finalResult.textContent = "First to score 3 wins";

    isGameEnded = false;
    playAgainButton.style.display = "none";
    playAgainButton.style.visibility = "hidden";
});

function playRound(player) {

    const computer = Math.ceil(Math.random() * 3);
    let scoreString;

    switch (computer) {
        
        case 1:
            computerImage.setAttribute("src", "images/rock2.png");
            break;
        
        case 2:
            computerImage.setAttribute("src", "images/paper2.png");
            break;

        case 3:
            computerImage.setAttribute("src", "images/scissors2.png");
            break;
    }

    let mainResult = "";

    if (player === computer) {
        mainResult = "Tied!";
    } else {       

        if (player === 1 && computer === 2) {
            mainResult = "Computer wins!";
            computerScore++;
        } else if (player === 2 && computer === 1) {
            mainResult = "Player wins!";
            playerScore++;
        } else if (player === 1 && computer === 3) {
            mainResult = "Player wins!";
            playerScore++;
        } else if (player === 3 && computer === 1) {
            mainResult = "Computers wins!";
            computerScore++;
        } else if (player === 2 && computer === 3) {
            mainResult = "Computers wins!";
            computerScore++;
        } else if (player === 3 && computer === 2) {
            mainResult = "Player wins!";
            playerScore++;
        }

        scoreString = `${playerScore} - ${computerScore}`;
    }

    resultMain.textContent = mainResult;
    resultDef.textContent = getResultDef(player, computer);

    scoreString = `${playerScore} - ${computerScore}`;
    score.textContent = scoreString;

    if (playerScore === 3) {
        gameEnded();
        finalResult.textContent = "Player won the game. Want to play again?"
    } else if (computerScore === 3) {
        gameEnded();
        finalResult.textContent = "Computer won the game. Want to play again?"
    }
}

function getResultDef(first, second) {

    if (first === 3 && second === 3) {
        return "Scissors tie with scissors!";
    }  else if (first === 1 && second === 1) {
        return "Rock ties with rock!";
    } else if (first === 2 && second === 2) {
        return "Paper ties with paper!";
    } else {
        if ((first === 1 && second === 2) || (second === 1 && first === 2)) {
            return "Paper wraps rock!";
        }
        if ((first === 1 && second === 3) || (second === 1 && first === 3)) {
            return "Rock breaks scissors!";
        }
        if ((first === 2 && second === 3) || (second === 2 && first === 3)) {
            return "Scissors cut papers!";
        }
    }
}

function gameEnded() {
    isGameEnded = true;
    playAgainButton.style.display = "revert";
    playAgainButton.style.visibility = "revert";
}