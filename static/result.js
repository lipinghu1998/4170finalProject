$(document).ready(function(){

  //Navigation Menu activate- Game
$("#nav_game").addClass("active");

$("#nav_learn").removeClass("active");
$("#nav_home").removeClass("active");


//Learn again
$("#learn_again").click(function(){
    window.location.href="/learn/1";

  })

//Game again
$("#game_again").click(function(){
      window.location.href="/game";

    })



});
