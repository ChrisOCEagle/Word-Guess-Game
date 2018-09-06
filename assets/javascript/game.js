// lets create an array of all the possible letters that the computer could be thinking of
var computersChoices = ["a", "b", "c", "d", "e",
                        "f", "g", "h", "j", "k",
                        "k", "l", "m", "n", "o",
                        "p", "q", "r", "s", "t",
                        "u", "v", "w", "x", "y", "z"],
// lets hold all of our wins, losses, and the number of guesses left
    wins = 0,
    losses = 0,
    guesses = Math.floor(Math.random() * 12) + 1,
// lets hold the references to the HTML that will display each item
    directionsText = document.getElementById('directions-text'),
    computersLetterText = document.getElementById('computers-letter'),
    usersChoiceText = document.getElementById('users-choice'),
    totalGuessesText = document.getElementById('total-guesses'),
    winsText = document.getElementById('wins-text'),
    lossesText = document.getElementById('losses-text');

// determine what letter the computer has in mind
var computersChoicesLength = computersChoices.length,
    computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)];

// defining an empty array for the user's guess
var userGuess = [],
    currentGuess = "";

// lets get the user's key press
document.onkeyup = function(event) {
    
    // determine what key the user chooses
    currentGuess = event.key.toLowerCase()
    if ( userGuess.includes(currentGuess) === false && computersChoices.includes(currentGuess) === true) {
        userGuess.push(currentGuess)
         // now for the actual game
        if (currentGuess === computersLetter && guesses !== 0) {
            wins++ // increment wins
            guesses = Math.floor(Math.random() * 12) + 1 // guesses get a new random number after every win
            computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)] // after every game the computer chooses a new number
            userGuess = [];
        } else {
            guesses-- // decreases guesses
            if (guesses === 0) {
                losses++ // increment the losses
                guesses = Math.floor(Math.random() * 12) + 1 // guesses get a new random number after every loss
                computersLetter = computersChoices[Math.floor(Math.random() * computersChoicesLength)] // after every game the computer chooses a new number
                usersChoiceText.textContent = "Your guesses: "
                userGuess = [];
            }
        }
    }

    // display everything
    usersChoiceText.textContent = "Your guesses: " + userGuess.join()
    totalGuessesText.textContent = "Guesses left: " + guesses
    winsText.textContent = "Wins: " + wins
    lossesText.textContent = "Losses: " + losses
}
