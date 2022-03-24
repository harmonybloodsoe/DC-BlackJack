var playerHand = [];
var dealerHand = [];
var deck = [];


function createDeck(){
    class Card {
        constructor(rank, suit) {
            this.rank = rank;
            this.suit = suit;
        }
    }

    let suits = ["hearts", "spades", "diamonds", "spades"];
    
    for (let i = 0; i<suits.length; i++){
        for (let x = 1; x<=13; x++){
            let newCard = new Card(x, suits[i])
            deck.push(newCard);
        }
    };

};

createDeck();
console.log(deck);