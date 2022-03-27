const { type } = require("express/lib/response");

var yourHand = [];
var dealerHand = [];
var deck = [];
var yourScore= 0;
var dealerScore= 0; 
var winner; 
//initalizes variables

function createDeck(){
    class Card {
        constructor(rank, suit, img) {
            this.rank = rank;
            this.suit = suit;
            this.img = `images/${rank}_of_${suit}.png`
        };
    };

    let suits = ["hearts", "clubs", "diamonds", "spades"];
    
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
        if (face.rank != 1) face.rank=10;
    };

   for (let i=0; i<deck.length; i++){  
       if (deck[i].rank==1 || deck[i].rank>10) faceCard(deck[i]);
    }
    
};
createDeck();


function fisherYates (myArray) {
    let i = myArray.length;
    while (i!==0 && --i) {
       let j = Math.floor(Math.random() * (i+1) );
       let tempi = myArray[i];
       let tempj = myArray[j];
       myArray[i] = tempj;
       myArray[j] = tempi;
    };
};
fisherYates(deck);


function scoreKeep(player, score){
    player.forEach(element => {
        if (element.rank == 1){
            score<11 ? score+=11 : score+=element.rank;
        }
        else {
            score += element.rank;
        };
        console.log(score);
    });
};


function toDeal(player, score, cardNum=2){
    for (let i=0; i < cardNum; i++){
        let newCard = deck.shift();
        player.push(newCard);
    };
    scoreKeep(player, score);
};
toDeal(yourHand, yourScore);
console.log(yourHand);
toDeal(dealerHand, dealerScore);
console.log(dealerHand);


if (yourScore == 21 || dealerScore > 21){
    winner = "player";
}
else if (yourScore > 21 || dealerScore == 21){
    winner = "dealer";
}

