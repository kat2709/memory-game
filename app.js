const cards = [
  {
    name: "butterfly",
    img: "./assets/cards/butterfly_cat.jpg",
  },
  {
    name: "candy",
    img: "./assets/cards/candy_cat.jpg",
  },
  {
    name: "bug",
    img: "./assets/cards/cat_bug.jpg",
  },
  {
    name: "kitten",
    img: "./assets/cards/cat_kitten.jpg",
  },
  {
    name: "shark",
    img: "./assets/cards/cat_shark.jpg",
  },
  {
    name: "play",
    img: "./assets/cards/cats_play.jpg",
  },
  {
    name: "coffee",
    img: "./assets/cards/coffee_cat.jpg",
  },
  {
    name: "autumn",
    img: "./assets/cards/autumn_cat.jpg",
  },
  {
    name: "computer",
    img: "./assets/cards/computer_cat.jpg",
  },
  {
    name: "dress",
    img: "./assets/cards/dress_cat.jpg",
  },
  {
    name: "flower",
    img: "./assets/cards/flower_cat.jpg",
  },
  {
    name: "funny",
    img: "./assets/cards/funny_cat.jpg",
  },
  {
    name: "grey",
    img: "./assets/cards/grey_cat.jpg",
  },
  {
    name: "look",
    img: "./assets/cards/look_cat.jpg",
  },
  {
    name: "love",
    img: "./assets/cards/love_cats.jpg",
  },
  {
    name: "phone",
    img: "./assets/cards/phone_cat.jpg",
  },
  {
    name: "red",
    img: "./assets/cards/red_cat.jpg",
  },
  {
    name: "rest",
    img: "./assets/cards/rest_cat.jpg",
  },
  {
    name: "sad",
    img: "./assets/cards/sad_cat.jpg",
  },
  {
    name: "sandwich",
    img: "./assets/cards/sandwich_cat.jpg",
  },
  {
    name: "sleepy",
    img: "./assets/cards/sleepy_cat.jpg",
  },
  {
    name: "summer",
    img: "./assets/cards/summer_cat.jpg",
  },
  {
    name: "three",
    img: "./assets/cards/three_cat.jpg",
  },
  {
    name: "travel",
    img: "./assets/cards/travel_cat.jpg",
  },
  {
    name: "two",
    img: "./assets/cards/two_cats.jpg",
  },
  {
    name: "upside",
    img: "./assets/cards/upside_down_cat.jpg",
  },
  {
    name: "work",
    img: "./assets/cards/work_cat.jpg",
  },
  {
    name: "bunny",
    img: "./assets/cards/cat_bunny.jpg",
  },
  {
    name: "butterfly",
    img: "./assets/cards/butterfly_cat.jpg",
  },
  {
    name: "candy",
    img: "./assets/cards/candy_cat.jpg",
  },
  {
    name: "bug",
    img: "./assets/cards/cat_bug.jpg",
  },
  {
    name: "kitten",
    img: "./assets/cards/cat_kitten.jpg",
  },
  {
    name: "shark",
    img: "./assets/cards/cat_shark.jpg",
  },
  {
    name: "play",
    img: "./assets/cards/cats_play.jpg",
  },
  {
    name: "coffee",
    img: "./assets/cards/coffee_cat.jpg",
  },
  {
    name: "autumn",
    img: "./assets/cards/autumn_cat.jpg",
  },
  {
    name: "computer",
    img: "./assets/cards/computer_cat.jpg",
  },
  {
    name: "dress",
    img: "./assets/cards/dress_cat.jpg",
  },
  {
    name: "flower",
    img: "./assets/cards/flower_cat.jpg",
  },
  {
    name: "funny",
    img: "./assets/cards/funny_cat.jpg",
  },
  {
    name: "grey",
    img: "./assets/cards/grey_cat.jpg",
  },
  {
    name: "look",
    img: "./assets/cards/look_cat.jpg",
  },
  {
    name: "love",
    img: "./assets/cards/love_cats.jpg",
  },
  {
    name: "phone",
    img: "./assets/cards/phone_cat.jpg",
  },
  {
    name: "red",
    img: "./assets/cards/red_cat.jpg",
  },
  {
    name: "rest",
    img: "./assets/cards/rest_cat.jpg",
  },
  {
    name: "sad",
    img: "./assets/cards/sad_cat.jpg",
  },
  {
    name: "sandwich",
    img: "./assets/cards/sandwich_cat.jpg",
  },
  {
    name: "sleepy",
    img: "./assets/cards/sleepy_cat.jpg",
  },
  {
    name: "summer",
    img: "./assets/cards/summer_cat.jpg",
  },
  {
    name: "three",
    img: "./assets/cards/three_cat.jpg",
  },
  {
    name: "travel",
    img: "./assets/cards/travel_cat.jpg",
  },
  {
    name: "two",
    img: "./assets/cards/two_cats.jpg",
  },
  {
    name: "upside",
    img: "./assets/cards/upside_down_cat.jpg",
  },
  {
    name: "work",
    img: "./assets/cards/work_cat.jpg",
  },
  {
    name: "bunny",
    img: "./assets/cards/cat_bunny.jpg",
  },
];

cards.sort(() => 0.5 - Math.random());

let idArr = [];
let chosenCardArr = [];

const board = document.querySelector(".board");

function createBoard() {
  for (i = 0; i < cards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", i);
    board.appendChild(card);
    card.addEventListener("click", clickCard);
  }
}

createBoard();

function clickCard(e) {
  const id = e.target.id;
  if (idArr.length === 0 || idArr[0] !== id) {
    idArr.push(id);
    chosenCardArr.push(cards[id].name);
  }

  if (idArr.length === 2) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    checkCards();
  }

  const card = document.getElementById(id);
  console.log(cards[id].img);
  card.style.backgroundImage = `url(${cards[id].img})`;
  console.log(idArr);
}

function checkCards() {
  if (chosenCardArr[0] === chosenCardArr[1]) {
    console.log(idArr);
    let firstCard = document.getElementById(idArr[0]);
    let secondCard = document.getElementById(idArr[1]);

    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");

    chosenCardArr = [];
    idArr = [];
    setTimeout(clickCardAgain, 500);
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
