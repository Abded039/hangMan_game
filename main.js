// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => createAndFormat(letter));

// function to generate letters
function createAndFormat(letter) {
  let element = document.createElement("span");
  let text = document.createTextNode(letter);
  element.appendChild(text);
  element.className = "letter-box";
  lettersContainer.appendChild(element);
}

// Object Of Words + Categories
const words = {
  programming: [
    "Php",
    "JavaScript",
    "Go",
    "Scala",
    "Fortran",
    "R",
    "MySql",
    "Python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palastine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get A Random Property

let allKeys = Object.keys(words);

// Random Number Depends On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category => Names
let randomPropName = allKeys[randomPropNumber];

// Category Words => Values Of Names
let randomPropValue = words[randomPropName];

// Random Number Depends On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert The Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depends On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-drow");

// Set Counter Of Clicked

let counter = 0;

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If The Clicked Letter Equal To One Of the Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Increase The Counter Of Clicked
        counter++;

        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // --------------------------------------
    if (theChosenWord.length === counter) {
      lettersContainer.classList.add("unable");

      winGame();
    }

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Number Of Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 9) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    }
  }
});

// Game Over Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is '${randomValueValue}'`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class One Div
  div.className = "popup-over";

  // Append To Body
  document.body.appendChild(div);
}

// -----------------------------------------

let rankLevel = "";

// Win Game Function
function winGame() {
  // Create Popup Div
  let div = document.createElement("div");
  let congra = document.createElement("span");
  let errorsSpan = document.createElement("span");
  let levelSpan = document.createElement("span");

  // Count The Number Of The Errors
  if (wrongAttempts <= 3) {
    rankLevel = "High";
  } else if (wrongAttempts <= 7) {
    rankLevel = "Medium";
  } else if (wrongAttempts === 0) {
    rankLevel = "Perfect";
  }
  // Create Text
  let divText = document.createTextNode(`Congratulation, You Win`);
  let numberOfErrors = document.createTextNode(
    `Number Of Errors Are : ${wrongAttempts}`
  );
  let yourLevel = document.createTextNode(`Your Level Is ${rankLevel}`);

  // Append Text To Spans
  congra.appendChild(divText);
  errorsSpan.appendChild(numberOfErrors);
  levelSpan.appendChild(yourLevel);

  // Append Text To Div
  div.appendChild(congra);
  div.append(errorsSpan);
  div.append(levelSpan);

  // Add Class One To Div
  div.className = "popup-win";

  // Append To Body
  document.body.appendChild(div);
}
