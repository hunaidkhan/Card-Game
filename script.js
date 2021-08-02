const SUITS = ['♤','♥','♢','♧'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const deck = [];
const playerCards = document.querySelectorAll(".container > .card");
const computerCards = document.querySelectorAll(".flip-container > .card");
let clickCounter = 0;


startGame();
function startGame(){
    createDeck();
    shuffleDeck(deck);
    const [deck1, deck2] = divideCards(26);
    displayLength(deck1, deck2);
    playerCards.forEach(playerCard => playerCard.addEventListener("click", () => dealCards(deck1, deck2)))
}

function createDeck(){
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < VALUES.length; j++) {
            const card = {
                suit: SUITS[i],
                value: VALUES[j]
            }
            deck.push(card)
        }    
    }
}

function shuffleDeck(deck){
    for (let i = 0; i < deck.length; i++) {
        const randomIndex = Math.round(Math.random() * (i + 1));
        const oldCard = deck[i];
        const replacedCard = deck[randomIndex];
        deck[i] = replacedCard;
        deck[randomIndex] = oldCard;
    }
}

function divideCards(cardsEach){
    const deck1 = [];
    const deck2 = [];

    for (let i = 0; i < cardsEach; i++) {
        deck1.push(deck.pop());
        deck2.push(deck.pop());
    }
    return [deck1, deck2];
}

function displayLength(deck1, deck2){
    playerCards[0].innerHTML = deck1.length;
    playerCards[1].innerHTML = deck2.length;
}

function displayHTML(card1, card2){
    computerCards[0].innerHTML = `${card1.suit}`
    computerCards[0].dataset.value = `${card1.value}${card1.suit}`;
    computerCards[1].innerHTML = `${card2.suit}`
    computerCards[1].dataset.value = `${card2.value}${card2.suit}`;
}

function dealCards(deck1, deck2){
    handleWin(deck1, deck2);
    clickCounter++;
    if(clickCounter%20 === 0){
        console.log('shuffling');
        shuffleDeck(deck1);
        shuffleDeck(deck2);
    }
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    console.log(card1, card2);
    displayHTML(card1, card2);
    displayLength(deck1, deck2);
    const result = checkGreaterCard(card1, card2);
    // console.log(result)
    // console.table(deck1);
    // console.table(deck2);
    if(result === true){
        console.log(true);
        deck1.push(card1);
        deck1.push(card2);
    }
    if(result === false){
        console.log(false);
        deck2.push(card1);
        deck2.push(card2);
    }
    if(result === 'tie'){ //in case of tie
        // handleTie(card1, card2, deck1, deck2);
        console.log('tie');
        deck1.push(card1);
        deck2.push(card2);
        shuffleDeck(deck1);
        shuffleDeck(deck2);
    }
    displayHTML(card1, card2);
    displayLength(deck1, deck2);
    handleWin(deck1, deck2);
}

function checkGreaterCard(card1, card2){
    console.log(card1, card2)
    const card1Index = VALUES.indexOf(card1.value);
    const card2Index = VALUES.indexOf(card2.value);
    if(card1Index === card2Index){
        return 'tie';
    }
    return card1Index > card2Index ? true : false;
}

function handleTie(card1, card2, deck1, deck2){
    const randomIndex1 = (Math.round(Math.random() * deck1.length)) - 1;
    const oldCard1 = card1;
    const replacedCard1 = deck1[randomIndex1];
    deck1[randomIndex1] = oldCard1;
    deck1.push(replacedCard1);
    const randomIndex2 = (Math.round(Math.random() * deck2.length)) - 1;
    const oldCard2 = card2;
    const replacedCard2 = deck2[randomIndex2];
    deck2[randomIndex2] = oldCard2;
    deck2.push(replacedCard2);
}

function handleWin(deck1, deck2){
    if(deck1.length === 0 || deck2.length === 0){
        alert("Game ended. Please reload to start new game");
    }
}


console.log(deck);