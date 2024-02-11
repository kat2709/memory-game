import { cardsFirstLevelArr } from "./cards_first_level.js";
import { cardsSecondLevelArr } from "./cards_second_level.js";
import { cardsThirdLevelArr } from "./cards_third_level.js";
import { cardsFourthLevelArr } from "./cards_fourth_level.js";

let sortArr = [];
let style = "";
let count = 0;
let idArr = [];
let chosenCardArr = [];
let scoreArray = [];
const board = document.querySelector(".board");
const moveCounter = document.getElementById("moves");
const bestResults = document.querySelector(".results");
const scoreTable = document.querySelector(".score-table");
const audio = document.querySelector("#audio");
let moves = 0;

let savedScore = localStorage.getItem("scoreArray");
if (savedScore) {
  scoreArray = JSON.parse(savedScore);
  scoreTable.classList.add("score-table-open");
}

function main() {
  sortArr = cardsFirstLevelArr;
  style = "card-first-level";
  createBoard();
  addMusic();
  if (savedScore) {
    createScoreTable();
  }
}

main();

// addEventListeners
function clickCardAgain() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", clickCard));
}

const firstLevelBtn = document.getElementById("baby");
firstLevelBtn.addEventListener("click", () => {
  removeStyles();
  firstLevelBtn.classList.add("level-active");
  sortArr = cardsFirstLevelArr;
  style = "card-first-level";
  board.innerHTML = "";
  createBoard();
});

const secondLevelBtn = document.getElementById("schoolguy");
secondLevelBtn.addEventListener("click", () => {
  removeStyles();
  secondLevelBtn.classList.add("level-active");
  const board = document.querySelector(".board");
  board.innerHTML = "";
  sortArr = cardsSecondLevelArr;
  style = "card-second-level";
  createBoard();
});

const thirdLevelBtn = document.getElementById("student");
thirdLevelBtn.addEventListener("click", () => {
  removeStyles();
  thirdLevelBtn.classList.add("level-active");
  const board = document.querySelector(".board");
  board.innerHTML = "";
  sortArr = cardsThirdLevelArr;
  style = "card-third-level";
  createBoard();
});

const fourthLevelBtn = document.getElementById("master");
fourthLevelBtn.addEventListener("click", () => {
  removeStyles();
  fourthLevelBtn.classList.add("level-active");
  const board = document.querySelector(".board");
  board.innerHTML = "";
  sortArr = cardsFourthLevelArr;
  style = "card-fourth-level";
  createBoard();
});

const resetBtn = document.querySelector(".reset-game");
resetBtn.addEventListener("click", () => {
  board.innerHTML = "";
  createBoard();
});

const musicBtn = document.getElementById("music-btn");
musicBtn.addEventListener("click", () => {
  const note = document.getElementById("note-music");
  musicBtn.classList.toggle("music-active");
  if (musicBtn.classList.contains("music-active")) {
    audio.play();
    note.classList.add("active-note");
  } else {
    audio.pause();
    note.classList.remove("active-note");
  }
});

const soundBtn = document.getElementById("sound-btn");
soundBtn.addEventListener("click", () => {
  soundBtn.classList.toggle("music-active");
  const note = document.getElementById("note-sounds");
  if (soundBtn.classList.contains("music-active")) {
    note.classList.add("active-note");
  } else {
    note.classList.remove("active-note");
  }
  // todo
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const endGameWindow = document.querySelector(".end-game-modal");
    endGameWindow.close();
    document.body.removeChild(endGameWindow);
  }
});

// UTILS
function createBoard() {
  sortArr.sort(() => 0.5 - Math.random());
  for (let i = 0; i < sortArr.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`${style}`);
    card.setAttribute("id", i);
    board.appendChild(card);
    card.addEventListener("click", clickCard);
  }
  moves = 0;
  moveCounter.innerHTML = moves;
  count = 0;
}

function clickCard(e) {
  const id = e.target.id;
  if (idArr.length === 0 || idArr[0] !== id) {
    idArr.push(id);
    chosenCardArr.push(sortArr[id].name);
  }
  if (idArr.length === 2) {
    moves++;
    moveCounter.innerHTML = moves;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    checkCards();
  }
  const card = document.getElementById(id);
  card.style.backgroundImage = `url(${sortArr[id].img})`;
}

function checkCards() {
  if (chosenCardArr[0] === chosenCardArr[1]) {
    const soundBtn = document.getElementById("sound-btn");
    if (soundBtn.classList.contains("music-active")) {
      const sound = document.createElement("audio");
      sound.src = "./assets/sounds/meow.mp3";
      sound.play();
    }
    let firstCard = document.getElementById(idArr[0]);
    let secondCard = document.getElementById(idArr[1]);
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    chosenCardArr = [];
    idArr = [];
    setTimeout(clickCardAgain, 500);
    count++;
    if (checkWin(count)) {
      setTimeout(youWin, 1000);
    }
  } else {
    setTimeout(closeCard, 500);
    setTimeout(clickCardAgain, 500);
  }
}

function closeCard() {
  const firstCard = document.getElementById(`${idArr[0]}`);
  const secondCard = document.getElementById(`${idArr[1]}`);
  firstCard.style.backgroundImage = `url(./assets/cards/blank.jpg)`;
  secondCard.style.backgroundImage = `url(./assets/cards/blank.jpg)`;
  chosenCardArr = [];
  idArr = [];
}

function checkWin(count) {
  if (count === sortArr.length / 2) {
    return true;
  }
}

function youWin() {
  const sound = document.createElement("audio");
  sound.src = "./assets/sounds/win_sound.mp3";
  sound.play();
  const activeBtn = document.querySelector(".level-active");
  const scoreObj = {};
  scoreObj.level = activeBtn.id;
  scoreObj.moves = moves;

  if (scoreArray.length < 5) {
    scoreArray.push(scoreObj);
  } else {
    scoreArray.push(scoreObj);
    scoreArray = scoreArray.slice(1);
  }

  localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
  createEndGameWindow();
  board.innerHTML = "";
  createBoard();
  createScoreTable();
}

function removeStyles() {
  const levelBtns = document.querySelectorAll(".level");
  levelBtns.forEach((btn) => btn.classList.remove("level-active"));
}

function createScoreTable() {
  scoreTable.classList.add("score-table-open");
  bestResults.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("scoreArray"));
  const key = "moves";
  const sortedArr = arr.sort((moves1, moves2) =>
    moves1[key] > moves2[key] ? 1 : -1
  );

  for (let i = 0; i < sortedArr.length; i++) {
    let result = document.createElement("div");
    result.innerHTML = `${i + 1}. the level: "${sortedArr[i].level}" in
    ${sortedArr[i].moves} moves!`;
    bestResults.appendChild(result);
  }
}

function addMusic() {
  audio.src = "./assets/sounds/background.mp3";
  audio.loop = true;
  audio.autoplay = true;
}

function createEndGameWindow() {
  const endGameWindow = document.createElement("dialog");
  endGameWindow.classList.add("end-game-modal");
  document.body.appendChild(endGameWindow);

  const title = document.createElement("h2");
  title.classList.add("end-game-title");
  title.innerHTML = "Congratulations!";
  endGameWindow.appendChild(title);

  const picture = document.createElement("div");
  picture.classList.add("end-game-picture");
  endGameWindow.appendChild(picture);

  const gameResultTitle = document.createElement("h5");
  const level = document.querySelector(".level-active");
  const idLevel = level.id;
  gameResultTitle.innerHTML = `You've solved game level: "${idLevel}" in ${moves} moves!`;
  endGameWindow.appendChild(gameResultTitle);

  const newGameBtn = document.createElement("div");
  newGameBtn.classList.add("basic");
  newGameBtn.classList.add("new-game");
  newGameBtn.innerHTML = "New game";
  endGameWindow.appendChild(newGameBtn);

  endGameWindow.showModal();

  newGameBtn.addEventListener("click", () => {
    endGameWindow.close();
    document.body.removeChild(endGameWindow);
  });
}
