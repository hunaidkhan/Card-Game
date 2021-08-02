const SUITS = ['♤','♥','♢','♧'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default class Deck{
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }
    shuffle(){
        for(let i = this.cards.length - 1; i > 0; i--){
            const newIndex = Math.round(Math.random() * (i + 1));
            const oldCard = this.cards[i];
            const replacedCard = this.cards[newIndex]
            this.cards[i] = replacedCard;
            this.cards[newIndex] = oldCard;
        }
    }
}

class Card{
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}