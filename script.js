// Select DOM elements
const computerScore = document.querySelector(".computer-score");
const playerScore = document.querySelector(".player-score");
const choiceItems = document.querySelectorAll(".choice-item");
const gamePlayArea = document.querySelector(".game-play-area");
const resultDisplay = document.querySelector(".result-display");
const victoryScreen = document.querySelector(".victory-screen");
const playAgainButton = document.querySelector(".play-again-button");
const replayButton = document.querySelector(".replay-button");
const victoryPlayButton = document.querySelector(".victory-play-button");
const rulesSection = document.querySelector(".rules-section");
const userIcon = document.querySelector(".player-choice-icons");
const pcIcon = document.querySelector(".pc-choice-icons");
const closeButton = document.querySelector(".close-button");
const rulesButton = document.querySelector(".rules-btn");
const nextButton = document.querySelector(".next-btn");
const mainScreen = document.querySelector(".game-container");
const winnerScreen = document.querySelector(".victory-screen");

// Convert NodeList to Array for ease of use
const choiceArray = Array.from(choiceItems);

// Update score display from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };
  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}
updateScoreDisplay();

// Get the value associated with the choice
const valueOfChoice = (id) => {
  switch (id) {
    case "rock": return 1;
    case "paper": return 2;
    case "scissor": return 3;
    default: return 0;
  }
};

// Get a random choice for the computer
const getRandomChoice = () => Math.floor(Math.random() * 3) + 1;

// Determine the result of the game
const determineResult = (userChoice, compChoice) => {
  if (userChoice === compChoice) return "tie";
  if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) return "user";
  return "comp";
};

// Update scores based on the result
const updateScores = (result) => {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result === "user") scores.user += 1;
  if (result === "comp") scores.computer += 1;

  localStorage.setItem("scores", JSON.stringify(scores));
  updateScoreDisplay();
};

// Update the result display based on choices
const updateResultDisplay = (result, userChoice, compChoice) => {
  gamePlayArea.style.display = "none";
  resultDisplay.style.display = "flex";

  const userIcons = {
    1: document.querySelector("#player-rock"),
    2: document.querySelector("#player-paper"),
    3: document.querySelector("#player-scissor")
  };

  const pcIcons = {
    1: document.querySelector("#pc-rock"),
    2: document.querySelector("#pc-paper"),
    3: document.querySelector("#pc-scissor")
  };


  Object.values(userIcons).forEach(icon => icon.style.display = "none");
  Object.values(pcIcons).forEach(icon => icon.style.display = "none");

  userIcons[userChoice].style.display = "flex";
  pcIcons[compChoice].style.display = "flex";

  const winText = document.querySelector("#victory-text");
  const loseText = document.querySelector("#defeat-text");
  const drawText = document.querySelector("#draw-text");
  const subText = document.querySelector(".sub-text");

  if (result === "tie") {
    winText.style.display = "none";
    loseText.style.display = "none";
    drawText.style.display = "block";
    subText.style.display = "none";
    playAgainButton.style.display = "none";
    replayButton.style.display = "block";
    userIcon.classList.remove("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "user") {
    winText.style.display = "block";
    loseText.style.display = "none";
    drawText.style.display = "none";
    subText.style.display = "block";
    playAgainButton.style.display = "block";
    replayButton.style.display = "none";
    nextButton.style.display = "inline";
    userIcon.classList.add("green-background");
    pcIcon.classList.remove("green-background");
  } else {
    winText.style.display = "none";
    loseText.style.display = "block";
    drawText.style.display = "none";
    subText.style.display = "block";
    playAgainButton.style.display = "block";
    replayButton.style.display = "none";
    userIcon.classList.remove("green-background");
    pcIcon.classList.add("green-background");
  }
};

// Handle choice click
const handleChoiceClick = (event) => {
  const choiceId = event.target.closest(".choice-item").id;
  const userChoice = valueOfChoice(choiceId);
  const compChoice = getRandomChoice();
  const result = determineResult(userChoice, compChoice);

  updateScores(result);
  updateResultDisplay(result, userChoice, compChoice);
};

// Handle play again button click
const handlePlayAgain = () => {
  gamePlayArea.style.display = "flex";
  resultDisplay.style.display = "none";
  victoryScreen.style.display = "none";
  mainScreen.style.display = "block";
};

// Handle next button click
const handleNext = () => {
  mainScreen.style.display = "none";
  winnerScreen.style.display = "flex";
};

// Handle rules button click
const handleShowRules = () => {
  rulesSection.style.display = "flex";
  closeButton.style.display = "flex";
  nextButton.style.display = "none";
};

// Handle close rules button click
const handleCloseRules = () => {
  rulesSection.style.display = "none";
  closeButton.style.display = "none";
};

// Event listeners
choiceArray.forEach(choice => choice.addEventListener("click", handleChoiceClick));
playAgainButton.addEventListener("click", handlePlayAgain);
replayButton.addEventListener("click", handlePlayAgain);
victoryPlayButton.addEventListener("click", handlePlayAgain);
nextButton.addEventListener("click", handleNext);
rulesButton.addEventListener("click", handleShowRules);
closeButton.addEventListener("click", handleCloseRules);
