const cards = [
  {
    name: "candy",
    img: "./assets/cards/candy_cat.jpg",
  },
  {
    name: "bug",
    img: "./assets/cards/cat_bug.jpg",
  },
  {
    name: "shark",
    img: "./assets/cards/cat_shark.jpg",
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
    name: "grey",
    img: "./assets/cards/grey_cat.jpg",
  },
  {
    name: "look",
    img: "./assets/cards/look_cat.jpg",
  },
  {
    name: "travel",
    img: "./assets/cards/travel_cat.jpg",
  },
  {
    name: "upside",
    img: "./assets/cards/upside_down_cat.jpg",
  },
  {
    name: "bunny",
    img: "./assets/cards/cat_bunny.jpg",
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
    name: "shark",
    img: "./assets/cards/cat_shark.jpg",
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
    name: "grey",
    img: "./assets/cards/grey_cat.jpg",
  },
  {
    name: "look",
    img: "./assets/cards/look_cat.jpg",
  },
  {
    name: "travel",
    img: "./assets/cards/travel_cat.jpg",
  },
  {
    name: "upside",
    img: "./assets/cards/upside_down_cat.jpg",
  },
  {
    name: "bunny",
    img: "./assets/cards/cat_bunny.jpg",
  },
];


let sortArr=[];
let count = 0;
let idArr = [];
let chosenCardArr = [];

const board = document.querySelector(".board");

function createBoard() {
  
  for (i = 0; i < cards.length; i++) {
    sortArr=cards.sort(() => 0.5 - Math.random());
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
    chosenCardArr.push(sortArr[id].name);
  }

  if (idArr.length === 2) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    checkCards();
  }

  const card = document.getElementById(id);
  console.log(sortArr[id].img);
  card.style.backgroundImage = `url(${cards[id].img})`;
  console.log(idArr);
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
  const board = document.querySelector(".board");
  board.innerHTML = "";
  count = 0;
  createBoard();
}
