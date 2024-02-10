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
let moves = 0;

let savedScore = localStorage.getItem("scoreArray");
if (savedScore) {
  scoreArray = JSON.parse(savedScore);
}

function main() {
  sortArr = cardsFirstLevelArr;
  style = "card-first-level";
  createBoard();
  createScoreTable();
  addMusic();
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
  const activeBtn = document.querySelector(".level-active");
  console.log(activeBtn.id);
  const scoreObj = {};
  scoreObj.level = activeBtn.id;
  scoreObj.moves = moves;
  console.log(scoreObj);

  if (scoreArray.length < 5) {
    scoreArray.push(scoreObj);
  } else {
    scoreArray.push(scoreObj);
    scoreArray = scoreArray.slice(1);
  }

  localStorage.setItem("scoreArray", JSON.stringify(scoreArray));

  alert("You Win!!!!");
  board.innerHTML = "";
  createBoard();
  createScoreTable();
}

function removeStyles() {
  const levelBtns = document.querySelectorAll(".level");
  levelBtns.forEach((btn) => btn.classList.remove("level-active"));
}

function createScoreTable() {
  bestResults.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("scoreArray"));
  const key = "moves";
  const sortedArr = arr.sort((moves1, moves2) =>
    moves1[key] > moves2[key] ? 1 : -1
  );

  for (let i = 0; i < sortedArr.length; i++) {
    let result = document.createElement("div");
    result.innerHTML = `${i + 1}. You've solved the level: "${
      sortedArr[i].level
    }" in
    ${sortedArr[i].moves} moves!`;
    bestResults.appendChild(result);
  }
}

function addMusic() {
  const audio = document.createElement("audio");
  audio.src = "./assets/sounds/memory_music.mp3";
  // audio.loop = true;
  // audio.autoplay = true;
  audio.play();
}
