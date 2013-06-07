




Meteor.startup(function () {
  // code to run on server at startup
});






Meteor.methods({


'evaluate_poker':function(player1,player2){

 // var PokerEvaluator = Npm.require("poker-evaluator");
  

  // var PokerEvaluator = poker_var;
  // var evaluator = new PokerEvaluator("./HandRanks.dat");
  // var res = evaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);
  // console.log("res "+res);


  var Hand, gary, mike, steve, winners;

  Hand = Npm.require('hoyle').Hand;

  gary = Hand.make(["3s", "3s", "4h", "5c", "7s", "8c", "9d"]);

  mike = Hand.make(["5s", "Ts", "3h", "Ac", "2s", "Ts", "8d"]);

  steve = Hand.make(["5s", "5h", "3s", "3c", "2s", "Ts", "3d"]);

  var player1_hand = Hand.make(player1);
  //player2_hand = Hand.make(player2);

  winners = Hand.pickWinners([player1_hand,gary]);

  //console.log(winners[0]);

  //console.log(player1_hand);


  //console.log(player2_hand);

  if(player1_hand==winners[0]){
    console.log('player1_hand wins');
    won=true;

    won_collection.remove({});
    won_collection.insert({
      won:true, 
    });

    return true;
  }
  else{
    console.log('player2_hand wins');
    won=false;

    won_collection.remove({});
    won_collection.insert({
      won:false, 
    });
    return false;
  }

}

});


