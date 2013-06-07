
arr = [];
arr_letter = ['H','S','D','C'];

for(i=1;i<=13;i++){
  for(j=0;j<=3;j++){

    str= arr_letter[j] + i.toString();
    arr.push(str);
  }
}

cards_dealt=[];

card_player="";

card1_player="";
card2_player="";

result_message="";

/*
Meteor.Router.add({

    '/': 'deck',

    '/test': 'test',

    '*': 'not_found'
});
*/


Meteor.startup(function () {
  show_card(card1_player,0,true,false,45);
  show_card(card2_player,1,true,false,45);

});


Template.deck.cards=function(){
  if(!Session.get('arr')){
    Session.set('arr',arr);
  }
  return Session.get('arr');;
}

Template.test.cards_random=function(){

  arr_random=arr.slice(0);
  arr_random.sort(function() {return 0.5 - Math.random()});
  Session.set('arr_random', arr_random);
  return Session.get('arr_random');
}

Template.deck.cards_dealt=function(){
  if(!Session.get('cards_dealt')){
   Session.set('cards_dealt', cards_dealt);
  }
  //return Session.get('cards_dealt');
  return cards_dealt;

}

Template.deck.card1_player=function(){
  if(!card1_player){
    card1_player=get_random();
    Session.set('card1_player',card1_player);
    show_card(card1_player,0,true,false,45);

    //remove it from the deck
    var index1 = arr.indexOf(card1_player);
    arr.splice(index1, 1);
  }

  return card1_player;
}


Template.deck.card2_player=function(){
  if(!card2_player){
    card2_player=get_random();
    Session.set('card2_player',card2_player);
    show_card(card2_player,1,true,false,45);

    //remove it from the deck
    var index2 = arr.indexOf(card2_player);
    arr.splice(index2, 1);
  }

  return card2_player;
}

/*
Template.deck.result=function(){
  
  if(result_message==""){
    result=Session.get('result_message');
  }

  return Session.get('result_message');
  //return result_message;
}
*/

Template.deck.events({

'click #randomize': function (e, t) {
  arr_random=arr.slice(0);
  arr_random.sort(function() {return 0.5 - Math.random()});
  Session.set('arr_random', arr_random);
},

'click #reset': function (e, t) {
  //reset the cards_dealt, card_player and arr
  cards_dealt=[];
  Session.set('cards_dealt', cards_dealt);
  var deck_canvas = document.getElementById('deck_canvas').getContext('2d');
  deck_canvas.clearRect(0,0,900,900);

  arr = [];
  arr_letter = ['H','S','D','C'];

  for(i=1;i<=13;i++){
    for(j=0;j<=3;j++){

      str= arr_letter[j] + i.toString();
      arr.push(str);
    }
  }

  card1_player=get_random();
  card2_player=get_random();

  Session.set('card1_player',card1_player);
  Session.set('card2_player',card2_player);

  show_card(card1_player,0,true,false,45);
  show_card(card2_player,1,true,false,45);


  //remove the cards from the deck
  var index1 = arr.indexOf(card1_player);
  arr.splice(index1, 1);
  var index2 = arr.indexOf(card2_player);
  arr.splice(index2, 1);

  Session.set('arr',arr);

  document.getElementById("result_div").innerHTML='';

},


'click #show_all': function (e, t) {
  //reset the cards_dealt, card_player and arr

  for(i=0;i<52;i++){
    show_card(arr[i],i,false,true,5);
  }

},

'click #deal': function (e, t) {
  arr_random2=arr.slice(0);
  arr_random2.sort(function() {return 0.5 - Math.random()});
  //cards_dealt=Session.get('cards_dealt');
  //if(cards_dealt.length()<5){
  if(Object.keys(cards_dealt).length<5){
    cards_dealt.push(arr_random2[0]);
    //remove the card from the deck
    var index = arr.indexOf(arr_random2[0]);
    arr.splice(index, 1);
    Session.set('arr',arr);

    card_dealt=arr_random2[0];
    show_card(card_dealt,Object.keys(cards_dealt).length,false,false,45);
  }

  //console.log("card_dealt "+card_dealt);

  Session.set('cards_dealt', cards_dealt);

},

'click #showdown': function (e, t) {
  //calculate the score of the player
  //

  player1 = [];

  if(Session.get('card1_player').length==2){
    number1_player = parseInt(Session.get('card1_player')[1]);
  }
  else{
    str=Session.get('card1_player')[1]+Session.get('card1_player')[2];
    number1_player = parseInt(str);
  }

  if(Session.get('card2_player').length==2){
    number2_player = parseInt(Session.get('card2_player')[1]);
  }
  else{
    str=Session.get('card2_player')[1]+Session.get('card2_player')[2];
    number2_player = parseInt(str);
  }

  card1={number:number1_player,suit:Session.get('card1_player')[0]};
  card2={number:number2_player,suit:Session.get('card2_player')[0]};

  player1.push(card1);
  player1.push(card2);


  //console.log("score_player " + score_player);
  //calculate the score of the dealt cards
  score_dealt = 0;
  
  //arr_temp=Session.get('cards_dealt');
  arr_temp=cards_dealt.slice(0);

  for(i=0;i<Object.keys(arr_temp).length;i++){
    if(arr_temp[i].length==2){
      str=arr_temp[i][1]+"";
    }
    else{
      str=arr_temp[i][1]+arr_temp[i][2]+"";
    }
    score_dealt += parseInt(str);

    card={number:str,suit:arr_temp[i][0]};
    player1.push(card);

  }

/*
  result=number1_player+number2_player+score_dealt;
  
  if(isEven(result)){
    result_message='you win!';
  }
  else{
    result_message='you lose!';
  }
*/

  //console.log("result_message " + result_message);

 // document.getElementById("result_div").innerHTML='<h1>'+result_message+'</h1>';
  
  //Session.set('result_message',result_message);

  //show_card(card_player,0,true);


  //var PokerEvaluator = Npm.require("poker-evaluator");
  //var evaluator = new PokerEvaluator("./HandRanks.dat");
  //var res = evaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);
  //console.log("res "+res);



  player2=player1.slice(0);
  player2.splice(6,1)
  player2.push({number:7,suit:'C'});

  console.log("player1[0].number "+player1[6].number);
  console.log("player2[0].number "+player2[6].number);

  console.log("player1.length "+player1.length);
  console.log("player2.length "+player2.length);


  Meteor.call('evaluate_poker',player1,player2,function(){
    //console.log('won '+won);
    //console.log('won_collection '+won_collection.findOne().won);
  });


  if(won_collection.findOne().won){
    result_message='you win!';
  }
  else{
    result_message='you lose!';
  }

  document.getElementById("result_div").innerHTML='<h1>'+result_message+'</h1>';

}

});




  function get_random() {

    arr_random3=arr.slice(0);
    arr_random3.sort(function() {return 0.5 - Math.random()});
    card_player=arr_random3[0];
    //console.log("card_player "+card_player);
    return card_player;
  }

  function isEven(_int){
    return (_int%2 == 0);
  }


function show_card(card_dealt,num_of_cards,your_card_bool,show_back,space){

  if(document.getElementById('deck_canvas') && document.getElementById('my_card_canvas')){
    var deck_canvas = document.getElementById('deck_canvas').getContext('2d');
    var my_card_canvas = document.getElementById('my_card_canvas').getContext('2d');


    if(card_dealt.length==3){

      if(card_dealt[2]==0){
        card_number="10";
      }
      if(card_dealt[2]==1){
        card_number="J";
      }
      if(card_dealt[2]==2){
        card_number="Q";
      }
      if(card_dealt[2]==3){
        card_number="K";
      }
      //card_number = card_dealt[1]+""+card_dealt[2];
      //console.log("card_number "+card_number);
    }
    else{
      card_number = card_dealt[1];
      if(card_dealt[1]==1){
        card_number="A";
      }
    }

    xpos=num_of_cards*space+window.innerWidth/10;

    card_kind = '';

    if(card_dealt[0]=="H"){
       card_kind = 'hearts';
    }
    if(card_dealt[0]=="D"){
       card_kind ='diamonds';
    }
    if(card_dealt[0]=="C"){
       card_kind = 'clubs';
    }
    if(card_dealt[0]=="S"){
       card_kind = 'spades';
    }


    if(show_back){
      if(your_card_bool){
        my_card_canvas.drawPokerBack(xpos, 0, 120,'yellow','orange');
      }
      else{
        deck_canvas.drawPokerBack(xpos, 0, 120,'yellow','orange');
      }
    }
    else {
      if(your_card_bool){
        my_card_canvas.drawPokerCard(xpos+130, 0, 120, card_kind, card_number);
      }
      else{
        deck_canvas.drawPokerCard(xpos, 0, 120, card_kind, card_number);
      }
    }
  }


}



function evaluate(player1,player2){

 var Hand, gary, mike, steve, winners;

  Hand = Npm.require('hoyle').Hand;

  gary = Hand.make(["2s", "3s", "4h", "5c", "7s", "8c", "9d"]);

  mike = Hand.make(["5s", "Ts", "3h", "Ac", "2s", "Ts", "8d"]);

  steve = Hand.make(["5s", "5h", "3s", "3c", "2s", "Ts", "3d"]);

  player1_hand = Hand.make(player1);
  //player2_hand = Hand.make(player2);

  winners = Hand.pickWinners([player1_hand,gary]);

  //console.log(winners[0]);

  //console.log(player1_hand);


  //console.log(player2_hand);

  if(player1_hand==winners[0]){
    //console.log('player1_hand wins');
    won=true;
    return true;
  }
  else{
    //console.log('player2_hand wins');
    won=false;
    return false;
  }

}




