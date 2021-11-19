let deck;
let pcTotal = 0;
let playerTotal = 0;
let pcCards = [];
let playerCards = [];

function drawCard() {
  const card = deck[0];
  deck.splice(0, 1);
  return card;
}

function calculateTotal(list) {
  let aces = 0;
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].card === "A") {
      aces += 1;
    }
    total += list[i].value;
  }

  if (aces > 0 && total + 10 <= 21) {
    total += 10;
  }

  return total;
}

function displayHiddenCard(card) {
  const spanLeft = document.createElement("span");
  spanLeft.className = "left";
  spanLeft.innerHTML = card.card + card.suit;
  spanLeft.style.display = "none";

  const spanRight = document.createElement("span");
  spanRight.className = "right";
  spanRight.innerHTML = card.card + card.suit;
  spanRight.style.display = "none";

  const img = document.createElement("img");
  img.src ="https://cdn.glitch.com/e169fef2-a9b5-474b-b607-c3b63db1a4d9%2Fcard.jpg?1516905219264";

  const newCard = document.createElement("div");
  newCard.className = "hiddenCard";
  newCard.appendChild(spanLeft);
  newCard.appendChild(spanRight);
  newCard.appendChild(img);

  document.querySelector(".pcCards").appendChild(newCard);
}

function getColor(suit) {
  if (suit === "&hearts;" || suit === "&diams;") {
    return "red";
  } else {
    return "black";
  }
}

function displayNewCard(card, mode) {
  const spanLeft = document.createElement("span");
  spanLeft.className = "left";
  spanLeft.innerHTML = card.card + card.suit;
  spanLeft.style.color = getColor(card.suit);

  const spanRight = document.createElement("span");
  spanRight.className = "right";
  spanRight.innerHTML = card.card + card.suit;
  spanRight.style.color = getColor(card.suit);

  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.appendChild(spanLeft);
  newCard.appendChild(spanRight);

  if (mode === "pc") {
    document.querySelector(".pcCards").appendChild(newCard);
  } else if (mode === "player") {
    document.querySelector(".playerCards").appendChild(newCard);
  }
}

function reverseCard() {
  const hiddenCard = document.querySelector(".hiddenCard");
  const children = hiddenCard.childNodes;
  children[0].style.display = "inline-block";
  children[1].style.display = "inline-block";
  children[2].style.display = "none";
  hiddenCard.className = "card";

  document.querySelector(".pcTotal").innerHTML =
    "Computer Hand - Total: " + pcTotal;
}

function getPcCards() {
  while (pcTotal < 16) {
    const newCard = drawCard();
    pcCards.push(newCard);
    pcTotal = calculateTotal(pcCards);
    displayNewCard(newCard, "pc");
  }

  reverseCard();
}

function gameOver() {
  document.querySelector(".hit").style.display = "none";
  document.querySelector(".stand").style.display = "none";
  const banner = document.createElement("div");
  banner.className = "banner";
  let result = "";
  if (playerTotal > 21) {
    result = "you lost sry";
    reverseCard();
  } else {
    getPcCards();
    if (playerTotal === pcTotal) {
      result = "wow a tie";
    } else if (playerTotal <= 21 && pcTotal > 21) {
      result = "you won!!!";
    } else if (playerTotal === 21 && pcTotal < 21) {
      result = "you won!!!";
    } else if (playerTotal < 21 && pcTotal === 21) {
      result = "you lost, sry";
    } else if (playerTotal < 21 && pcTotal < 21) {
      if (playerTotal < pcTotal) {
        result = "you lost sry";
      } else {
        result = "you won!!!";
      }
    }
  }

  banner.innerHTML = result;
  document.querySelector(".player").appendChild(banner);

  const reset = document.createElement("input");
  reset.className = "reset";
  reset.type = "submit";
  reset.value = "Restart";
  document.querySelector(".player").appendChild(reset);

  document.querySelector(".reset").addEventListener("click", function() {
    pcTotal = 0;
    playerTotal = 0;
    pcCards = [];
    playerCards = [];
    const game = document.querySelector(".game");
    while (game.firstChild) {
      game.removeChild(game.firstChild);
    }
    setUpDeck();
  });
}

function displayStartingCards() {
  const game = document.querySelector(".game");

  const pc = document.createElement("div");
  pc.className = "pc";
  game.appendChild(pc);

  const pcScore = document.createElement("div");
  pcScore.className = "pcTotal";
  pcScore.innerHTML = "Computer Hand - Total: ?";

  const pcHand = document.createElement("div");
  pcHand.className = "pcCards";

  pc.appendChild(pcScore);
  pc.appendChild(pcHand);

  const player = document.createElement("div");
  player.className = "player";
  game.appendChild(player);

  const playerScore = document.createElement("div");
  playerScore.className = "playerTotal";
  playerScore.innerHTML = "Player Hand - Total: " + playerTotal;

  const playerHand = document.createElement("div");
  playerHand.className = "playerCards";

  player.appendChild(playerScore);
  player.appendChild(playerHand);

  displayHiddenCard(pcCards[0]);
  displayNewCard(pcCards[1], "pc");

  for (let i = 0; i < playerCards.length; i++) {
    displayNewCard(playerCards[i], "player");
  }

  const hit = document.createElement("input");
  hit.className = "hit";
  hit.type = "submit";
  hit.value = "Hit";

  const stand = document.createElement("input");
  stand.className = "stand";
  stand.type = "submit";
  stand.value = "Stand";

  player.appendChild(hit);
  player.appendChild(stand);
  document.querySelector(".hit").addEventListener("click", function() {
    const newCard = drawCard();
    displayNewCard(newCard, "player");
    playerCards.push(newCard);
    playerTotal = calculateTotal(playerCards);
    document.querySelector(".playerTotal").innerHTML =
      "Player Hand - Total: " + playerTotal;
    if (playerTotal >= 21) {
      gameOver();
    }
  });

  document.querySelector(".stand").addEventListener("click", function() {
    gameOver();
  });
}

function startGame() {
  let newCard = drawCard();
  pcCards.push(newCard);

  newCard = drawCard();
  playerCards.push(newCard);

  newCard = drawCard();
  pcCards.push(newCard);

  newCard = drawCard();
  playerCards.push(newCard);

  pcTotal = calculateTotal(pcCards);
  playerTotal = calculateTotal(playerCards);

  displayStartingCards();

  if (playerTotal == 21) {
    gameOver();
  }
}

function setUpDeck(startValues) {
  deck = [
    { card: "A", value: 1, suit: "&diams;" },
    { card: "2", value: 2, suit: "&diams;" },
    { card: "3", value: 3, suit: "&diams;" },
    { card: "4", value: 4, suit: "&diams;" },
    { card: "5", value: 5, suit: "&diams;" },
    { card: "6", value: 6, suit: "&diams;" },
    { card: "7", value: 7, suit: "&diams;" },
    { card: "8", value: 8, suit: "&diams;" },
    { card: "9", value: 9, suit: "&diams;" },
    { card: "10", value: 10, suit: "&diams;" },
    { card: "J", value: 10, suit: "&diams;" },
    { card: "Q", value: 10, suit: "&diams;" },
    { card: "K", value: 10, suit: "&diams;" },

    { card: "A", value: 1, suit: "&clubs;" },
    { card: "2", value: 2, suit: "&clubs;" },
    { card: "3", value: 3, suit: "&clubs;" },
    { card: "4", value: 4, suit: "&clubs;" },
    { card: "5", value: 5, suit: "&clubs;" },
    { card: "6", value: 6, suit: "&clubs;" },
    { card: "7", value: 7, suit: "&clubs;" },
    { card: "8", value: 8, suit: "&clubs;" },
    { card: "9", value: 9, suit: "&clubs;" },
    { card: "10", value: 10, suit: "&clubs;" },
    { card: "J", value: 10, suit: "&clubs;" },
    { card: "Q", value: 10, suit: "&clubs;" },
    { card: "K", value: 10, suit: "&clubs;" },

    { card: "A", value: 1, suit: "&hearts;" },
    { card: "2", value: 2, suit: "&hearts;" },
    { card: "3", value: 3, suit: "&hearts;" },
    { card: "4", value: 4, suit: "&hearts;" },
    { card: "5", value: 5, suit: "&hearts;" },
    { card: "6", value: 6, suit: "&hearts;" },
    { card: "7", value: 7, suit: "&hearts;" },
    { card: "8", value: 8, suit: "&hearts;" },
    { card: "9", value: 9, suit: "&hearts;" },
    { card: "10", value: 10, suit: "&hearts;" },
    { card: "J", value: 10, suit: "&hearts;" },
    { card: "Q", value: 10, suit: "&hearts;" },
    { card: "K", value: 10, suit: "&hearts;" },

    { card: "A", value: 1, suit: "&spades;" },
    { card: "2", value: 2, suit: "&spades;" },
    { card: "3", value: 3, suit: "&spades;" },
    { card: "4", value: 4, suit: "&spades;" },
    { card: "5", value: 5, suit: "&spades;" },
    { card: "6", value: 6, suit: "&spades;" },
    { card: "7", value: 7, suit: "&spades;" },
    { card: "8", value: 8, suit: "&spades;" },
    { card: "9", value: 9, suit: "&spades;" },
    { card: "10", value: 10, suit: "&spades;" },
    { card: "J", value: 10, suit: "&spades;" },
    { card: "Q", value: 10, suit: "&spades;" },
    { card: "K", value: 10, suit: "&spades;" }
  ];

  // shuffle deck by randomly switching indices from the back of the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // we want to move these to the front in the right order so that we draw them correctly
  if (startValues) {
    let start = 0;
    for (let i = startValues.length - 1; i >= 0; i--) {
      for (let j = start; j < deck.length; j++) {
        if (startValues[i] === deck[j].card) {
          const movedCard = deck[j];
          deck.splice(j, 1);
          deck.splice(0, 0, movedCard);
          start++;
          break;
        }
      }
    }
  }

  startGame();
}

function hideStart() {
  let startValues;
  document.querySelector(".playBtn").addEventListener("click", function(evt) {
    startValues = document.querySelector("#startValues").value;
    document.querySelector(".start").style.display = "none";
    evt.preventDefault();
    setUpDeck(startValues);
  });
}

function main() {
  hideStart();
}

document.addEventListener("DOMContentLoaded", main);
