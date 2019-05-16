// lets create an array of all the possible letters that the computer could be thinking of
var computersChoices = ["a", "b", "c", "d", "e",
                        "f", "g", "h", "i", "j",
                        "k", "l", "m", "n", "o",
                        "p", "q", "r", "s", "t",
                        "u", "v", "w", "x", "y", "z"],
// lets hold all of our wins, losses, and the number of guesses left
    wins = 0,
    losses = 0,
    guesses,
// lets hold the references to the HTML that will display each item
    directionsText = document.getElementById('directions-text'),
    computersLetterText = document.getElementById('computers-letter'),
    usersChoiceText = document.getElementById('users-choice'),
    totalGuessesText = document.getElementById('total-guesses'),
    winsText = document.getElementById('wins-text'),
    lossesText = document.getElementById('losses-text'),
    swtch = document.getElementsByClassName('switch'),
    difficulty = document.getElementById('difficulty-adjustment');

swtch[0].onclick = function(event) {
    if (event.target.nodeName === 'INPUT') {
        if (event.target.checked) {
            difficulty.setAttribute('data-difficulty', 'hard');
        } else {
            difficulty.setAttribute('data-difficulty', 'easy');
        };
    };
};

// determine what letter the computer has in mind
var computersChoicesLength = computersChoices.length,
    computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)];

// defining an empty array for the user's guess
var userGuess = [],
    currentGuess;

// lets get the user's key press
document.onkeyup = function(event) {
    if (event.key.toLowerCase() === "enter") {
        initGame();
    };      
}

function runGame() {
    document.addEventListener("keyup", function letterGuess(event) {
        // determine what key the user chooses
        currentGuess = event.key.toLowerCase()
        // duplicate guesses are not allowed
        if (!userGuess.includes(currentGuess) && computersChoices.includes(currentGuess)) {
            userGuess.push(currentGuess);
            // if the user guesses the letter correctly within the guess limit
            if (currentGuess === computersLetter && guesses !== 0) {
                // wins increment
                wins++
                // show the old letter before choosing a new letter
                revealLetter(computersLetter)
                .then(() => computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)])
                .catch(err => console.log(err));
                // the user's guesses reset
                userGuess = [];
                guesses = "";
                resetGuesses();
                // the difficulty switch becomes unlocked
                disableSwitch(swtch[0])
                // stop listening for an event
                document.removeEventListener("keyup", letterGuess)
            } else {
                guesses-- // decreases guesses
                if (guesses === 0) {
                    // lossess increment
                    losses++
                    // show the old letter before choosing a new letter
                    revealLetter(computersLetter)
                    .then(() => computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)])
                    .catch(err => console.log(err));
                    // the user's guesses reset
                    userGuess = [];
                    guesses = "";
                    resetGuesses();
                    // the difficulty switch becomes unlocked
                    disableSwitch(swtch[0])
                    // stop listening for an event
                    document.removeEventListener("keyup", letterGuess)
                }
            }
            displayEverything();
        };
    });
};

function revealLetter(letter) {
    return new Promise((resolve, reject) => {
        computersLetterText.textContent = "The Computer's letter was: " + letter;
        resolve(letter);
    });
};

function resetGuesses() {
    usersChoiceText.textContent = "Your guesses: ";
    totalGuessesText.textContent = "Guesses left: ";
};

// display everything
function displayEverything() {
    usersChoiceText.textContent = "Your guesses: " + userGuess.join(", ")
    totalGuessesText.textContent = "Guesses left: " + guesses
    winsText.textContent = "Wins: " + wins
    lossesText.textContent = "Losses: " + losses   
};

function initGame() {
    disableSwitch(swtch[0])
    guess(difficulty.getAttribute('data-difficulty'));
    computersLetterText.textContent = "";
    displayEverything();
    runGame();
};

var disableSwitch = btn => {
    var input = btn.children[0];
    if (!input.disabled) {
        input.disabled = true;
    } else {
        input.disabled = false;
    };
};

function guess(difficulty) {
    // if the difficulty is easy than the number of guesses will be half as many as the total number of computer choices
    // otherwise the number of guesses will be one fourth as many as the computer choices
    if (difficulty === 'easy') {
        return guesses = computersChoicesLength / 2;
    } else {
        return guesses = Math.ceil(computersChoicesLength / 4);
    }
};