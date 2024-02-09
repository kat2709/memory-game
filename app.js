import { cardsFirstLevelArr } from "./cards_first_level.js";
import { cardsSecondLevelArr } from "./cards_second_level.js";
import { cardsThirdLevelArr } from "./cards_third_level.js";
import { cardsFourthLevelArr } from "./cards_fourth_level.js";

let sortArr = [];
let style = "";
let count = 0;
let idArr = [];
let chosenCardArr = [];
const board = document.querySelector(".board");

function main() {
  sortArr = cardsFirstLevelArr;
  style = "card-first-level";
  createBoard();
}

main();

function createBoard() {
  console.log(sortArr);
  sortArr.sort(() => 0.5 - Math.random());
  for (let i = 0; i < sortArr.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`${style}`);
    card.setAttribute("id", i);
    board.appendChild(card);
    card.addEventListener("click", clickCard);
  }
}

function clickCard(e) {
  const id = e.target.id;
  if (idArr.length === 0 || idArr[0] !== id) {
    idArr.push(id);
    chosenCardArr.push(sortArr[id].name);
  }
  if (idArr.length === 2) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    checkCards();
  }
  const card = document.getElementById(id);
  card.style.backgroundImage = `url(${sortArr[id].img})`;
}

function checkCards() {
  if (chosenCardArr[0] === chosenCardArr[1]) {
    console.log(count);
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

function clickCardAgain() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", clickCard));
}

function checkWin(count) {
  if (count === sortArr.length / 2) {
    return true;
  }
}

function youWin() {
  alert("You Win!!!!");
  board.innerHTML = "";
  count = 0;
  createBoard();
}

const firstLevelBtn = document.getElementById("baby");
firstLevelBtn.addEventListener("click", () => {
  removeStyles();
  firstLevelBtn.classList.add("level-active");
  sortArr = cardsFirstLevelArr;
  style = "card-first-level";
  board.innerHTML = "";
  count = 0;
  createBoard();
});

const secondLevelBtn = document.getElementById("pupil");
secondLevelBtn.addEventListener("click", () => {
  removeStyles();
  secondLevelBtn.classList.add("level-active");
  const board = document.querySelector(".board");
  board.innerHTML = "";
  sortArr = cardsSecondLevelArr;
  style = "card-second-level";
  count = 0;
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
  count = 0;
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
  count = 0;
  createBoard();
});

function removeStyles() {
  const levelBtns = document.querySelectorAll(".level");
  levelBtns.forEach((btn) => btn.classList.remove("level-active"));
}
