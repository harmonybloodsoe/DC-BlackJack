window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
  // const { type } = require("express/lib/response");

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
// creates a card object that will be used to create the deck

      let suits = ["hearts", "clubs", "diamonds", "spades"];
      
      for (let i = 0; i<suits.length; i++){
          for (let x = 1; x<=13; x++){
              let newCard = new Card(x, suits[i])
              deck.push(newCard);
          }
      };
// pushes 13 new card objects for each suit and gives them a corresponding 
// that will later on be their card number

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
// corrects an error that was created with the face card image names
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
//shuffles the deck

  function scoreKeep(player, score){
      player.forEach(element => {
          if (element.rank == 1){
              score<11 ? score+=11 : score+=element.rank;
          }
          else {
              score += element.rank;
          };
          player === dealerHand ? dealerScore = score : yourScore = score;
          console.log(score);
      });
      if (yourScore == 21 || dealerScore > 21){
        winner = "player";
        return winner;
      }
      else if (yourScore > 21 || dealerScore == 21){
        winner = "dealer";
        return winner;
    }
  // determines winner
  };
//keeps score by apply 10 points for any face cards and either 1 or
//11 points for an ace depending on the player score prior

  function toDeal(player, cardNum=1){

      for (let i=0; i < cardNum; i++){
          let newCard = deck.shift();
          player.push(newCard);
          let img = document.createElement('img');
          img.src = newCard.img;
          // if (yourCards == ""){
            player === dealerHand ? dealerCards.appendChild(img) : yourCards.appendChild(img);
          // }
          // else{
          //   player === dealerHand ? dealerCards.src = newCard.img : yourCards.src = newCard.img;
          // }
          
      };
  };
//deals cards to any player

  // function hideMe(){
  //   let firstCard = document.querySelector('div.dealer-hand img');
  //   firstCard.src = 'https://i.pinimg.com/564x/72/13/e1/7213e1a55a3c0c73d5864e14ba1aa7dc.jpg'
  // }
  //makes first card that dealer is dealt invisible until after 1st move is made


  let yourCards = document.getElementById('player-hand');
  let dealerPoints = document.getElementById('dealer-points');
  let dealerCards = document.getElementById('dealer-hand');
  let yourPoints = document.getElementById('player-points');
// initialized variables for DOM

  function dealMe (){
    toDeal(yourHand, 2);
    scoreKeep(yourHand, yourScore);
    toDeal(dealerHand, 2);
    scoreKeep(dealerHand, dealerScore);
    // hideMe();
    // yourHand.forEach(element=>{
    //   let img = document.createElement('img');
    //   img.src = element.img;
    //   yourCards.appendChild(img);
    //   });
    // let img = document.createElement('img');
    // img.src = dealerHand[0].img;
    // dealerCards.appendChild(img);
    yourPoints.append(yourScore);
    dealerPoints.append(dealerScore);
    console.log("your score "+ yourScore);
    console.log("dealer score "+ dealerScore);
    console.log("your hand ");
    console.log(yourHand);
  };  
// allows deal button to deal shuffled cards

  function hitMe (){
    console.log("new dealer score "+dealerScore);
    toDeal(yourHand);
    toDeal(dealerHand);
    console.log("new score "+yourScore);
    console.log("your hand ");
    console.log(yourHand);
  };
//

  function illStand(){
    console.log("newest dealer score "+dealerScore);
    toDeal(dealerHand);
    toDeal(yourHand);
    console.log("your newest score "+yourScore);
    console.log("your hand ");
    console.log(yourHand);
  };

  let dealButton = document.getElementById('deal-button');
  dealButton.addEventListener('click', dealMe);

  let hitButton = document.getElementById('hit-button');
  hitButton.addEventListener('click', hitMe);
  
  let standButton = document.getElementById('stand-button');
  standButton.addEventListener('click', illStand)


  
});