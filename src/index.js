import cardData from "./cardData.json" assert { type: 'json' };
const root = document.getElementById("root");
const resultDiv = document.querySelector("#result-bg");
const restartBtn = document.querySelector("#restart");
const volumeBtn = document.querySelector("#volume");
const cardFlipSound = new Audio('../assets/sounds/card-flip.mp3');
const victorySound = new Audio('../assets/sounds/victory.mp3');
const defeatSound = new Audio('../assets/sounds/defeat.mp3');

const cards = [ ...cardData, ...cardData ];
let volumeLevel = 1;
let moveCount = 1;
let score = 500;
let flippedCard = null;
let resulText = "";

function flipCard (card) {
  if (!card.getAttribute("is-flipped")) {
    cardFlipSound.play();
    card.classList.add('flip-card');
    if (flippedCard) {
      moveCount--;
      updateMoveCountOnUi();
      if (moveCount === 0) {
        showResult(false)
      }
      if (flippedCard.getAttribute("name") !== card.getAttribute("name")) {
        flipCardBack(card);
        flipCardBack(flippedCard);
      } else {
        score += 100;
        updateScoretOnUi();
        if (score === 600) {
          showResult(true);
        }
        setTimeout(() => {
          card.classList.add('remove-card');
          flippedCard.classList.add('remove-card');
        }, 500)
      }
      setTimeout(() => {
        flippedCard = null;
      }, 500)
    } else flippedCard = card;
    card.setAttribute("is-flipped", "true");
  }
}

function flipCardBack (card) {
  setTimeout(() => {
    card.setAttribute("is-flipped", "");
    cardFlipSound.play();
    card.classList.add('flip-card-back');
  }, 1500);

  setTimeout(() => {
    card.children[1].classList.add('flip-card-back-img');
  }, 1800);

  setTimeout(() => {
    card.children[1].classList.remove('flip-card-back-img');
    card.classList.remove('flip-card-back');
    card.classList.remove('flip-card');
  }, 2000);
}

const createCard = (cardData) => {
  const cardItem = document.createElement('div');
  const card = document.createElement('div');
  const cardFrontImg = document.createElement('img');
  const cardBackImg = document.createElement('img');

  cardFrontImg.src = cardData.src;
  cardBackImg.src = `../assets/card-imgs/main.png`;

  cardFrontImg.classList.add('card-front-img');
  cardBackImg.className = 'card-back-img';
  cardItem.className = 'col-3 card-item';
  card.className = 'game-card';

  card.append(cardFrontImg, cardBackImg);
  cardItem.append(card);
  card.setAttribute("name", cardData.name);
  card.setAttribute("is-flipped", cardData.isFlipped);
  

  card.addEventListener('click', () => {
    flipCard(card);
  })
  return cardItem;
}

const cardsSetup = () => {

  cards.sort(() => Math.random() - 0.5).forEach(cardData => {
    const card = createCard(cardData);
    root.append(card);
  })
}

function updateMoveCountOnUi() {
  const moveCountUIElement = document.querySelector("#move-count");
  moveCountUIElement.innerText = moveCount;
}

function updateScoretOnUi() {
  const scoretUIElement = document.querySelector("#score");
  scoretUIElement.innerText = score;
}

function showResult(boolean) {
  if (boolean) {
    resulText = "You Won!";
    victorySound.play();
  } else {
    resulText = "You Lost!";
    defeatSound.play();
  }
  resultDiv.className = "result-bg-show";
  resultDiv.firstElementChild.classList.add("result-show");
  resultDiv.firstElementChild.firstElementChild.innerText = resulText;
}

function restart() {
  resultDiv.className = "";
  resultDiv.children[0].classList.remove("result-show");
  root.innerHTML = "";
  score = 0;
  moveCount = 10;
  updateMoveCountOnUi();
  updateScoretOnUi();
  cardsSetup();
}

resultDiv.addEventListener("click", () => {
  restart();
});

restartBtn.addEventListener("click", () => {
  restart();
});

volumeBtn.addEventListener("click", () => {
  if (volumeLevel) {
    volumeLevel = 0;
  } else {
    volumeLevel = 1;
  }
  cardFlipSound.volume = volumeLevel;
  victorySound.volume = volumeLevel;
  defeatSound.volume = volumeLevel;
})

cardsSetup();
updateMoveCountOnUi();
updateScoretOnUi();