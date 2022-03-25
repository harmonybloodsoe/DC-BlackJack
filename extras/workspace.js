const { type } = require("express/lib/response");

var yourHand = [];
var dealerHand = [];
var deck = [];
//initalizes variables

function createDeck(){
    class Card {
        constructor(rank, suit, img) {
            this.rank = rank;
            this.suit = suit;
            this.img = `images/${rank}_of_${suit}.png`
        };
    };

    let suits = ["hearts", "spades", "diamonds", "spades"];
    
    for (let i = 0; i<suits.length; i++){
        for (let x = 1; x<=13; x++){
            let newCard = new Card(x, suits[i])
            deck.push(newCard);
        }
    };

    function faceCard(face){
        let faceRanks= {
            1: 'ace',
            11: 'jack', 
            12: 'queen',
            13: 'king', 
        };
        face.img= `images/${faceRanks[face.rank]}_of_${face.suit}.png`;
    };

   for (let i=0; i<deck.length; i++){  
       if (deck[i].rank==1 || deck[i].rank>10) faceCard(deck[i]);
    }
 
};
createDeck();

function fisherYates (myArray) {
    let i = myArray.length;
    while (i!==0 && --i) {
       let j = Math.floor(Math.random() * (i + 1) );
       let tempi = myArray[i];
       let tempj = myArray[j];
       myArray[i] = tempj;
       myArray[j] = tempi;
    };
};

function toDeal(player, cardNum=2){
    for (let i=0; i < cardNum; i++){
        let newCard = deck.shift();
        player.push(newCard);
    };
};

console.log(deck);
