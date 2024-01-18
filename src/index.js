const root = document.getElementById("root");
const cardFlipSound = new Audio('../assets/sounds/card-flip.mp3');
import cardData from "./cardData.json" assert { type: 'json' };

const cards = [ ...cardData, ...cardData ];
let moveCount = 10;
let score = 0;
let flippedCard = null;

function flipCard (card) {
  if (!card.getAttribute("is-flipped")) {
    cardFlipSound.play();
    card.classList.add('flip-card');
    if (flippedCard) {
      moveCount--;
      updateMoveCountOnUi();

      if (flippedCard.getAttribute("name") !== card.getAttribute("name")) {
        flipCardBack(card);
        flipCardBack(flippedCard);
      } else {
        score += 100;
        updateScoretOnUi();
      }
      flippedCard = null;
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

cardsSetup();
updateMoveCountOnUi();
updateScoretOnUi();