$(document).ready(function(){
  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_learn").removeClass("active");
  $("#nav_home").removeClass("active");


  //Redirect start button to game 0
  $("#start_game").click(function(){
         window.location.href="/game/0";

  })


  //Reset score before every game starts
  $.ajax({
   type: "POST",
   url: "/reset_score",
   dataType : "json",
   contentType: "application/json; charset=utf-8",
   data : JSON.stringify({"check":"success"}),
   success: function(response){},
   error: function(request, status, error){
       console.log("Error");
       console.log(request)
       console.log(status)
       console.log(error)
   }
});


  //Reset hints before every game starts
  $.ajax({
   type: "POST",
   url: "/reset_hints",
   dataType : "json",
   contentType: "application/json; charset=utf-8",
   data : JSON.stringify({"check":"success"}),
   success: function(response){},
   error: function(request, status, error){
       console.log("Error");
       console.log(request)
       console.log(status)
       console.log(error)
   }
});




});
