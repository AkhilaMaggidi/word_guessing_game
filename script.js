const words = [
    { word: "javascript", hint: "Programming language" },
    { word: "html", hint: "Markup language for web" },
    { word: "css", hint: "Style sheet language" },
    { word: "browser", hint: "Used to surf the internet" },
    { word: "computer", hint: "Electronic device" },
    { word: "internet", hint: "Global network" },
    { word: "keyboard", hint: "Input device" },
    { word: "monitor", hint: "Display device" },
    { word: "mouse", hint: "Pointing device" },
    { word: "website", hint: "Collection of web pages" }
];

let selectedWord = "";
let selectedHint = "";
let displayWord = [];
let guessedLetters = [];

const hintText = document.getElementById("hint-text");
const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const guessedLettersList = document.getElementById("guessed-letters-list");

function initializeGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word.toLowerCase();
    selectedHint = words[randomIndex].hint;
    displayWord = Array(selectedWord.length).fill("_");
    guessedLetters = [];

    hintText.textContent = selectedHint;
    updateWordDisplay();
    updateGuessedLetters();
    letterInput.value = "";
    letterInput.focus();
}

function updateWordDisplay() {
    wordDisplay.textContent = displayWord.join(" ");
}

function updateGuessedLetters() {
    guessedLettersList.textContent = guessedLetters.join(", ");
}

function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!letter.match(/^[a-z]$/)) {
        alert("Please enter a single letter (a-z).");
        letterInput.focus();
        return;
    }

    if (guessedLetters.includes(letter)) {
        alert("You have already guessed that letter.");
        letterInput.focus();
        return;
    }

    guessedLetters.push(letter);
    updateGuessedLetters();

    let correctGuess = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            displayWord[i] = letter;
            correctGuess = true;
        }
    }

    updateWordDisplay();

    if (!correctGuess) {
        // Incorrect guess, no special action needed, just continue
    }

    if (!displayWord.includes("_")) {
        alert("You have guessed the word correctly!");
        initializeGame();
    }

    letterInput.focus();
}

guessBtn.addEventListener("click", guessLetter);

letterInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});

window.addEventListener("load", initializeGame);
