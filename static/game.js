$(document).ready(function(){
  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_learn").removeClass("active");
  $("#nav_home").removeClass("active");


  //Reset score to zero before every game starts
  $.ajax({
   type: "POST",
   url: "/reset_score",
   dataType : "json",
   contentType: "application/json; charset=utf-8",
   data : JSON.stringify({"check":"success"}),
   success: function(response){
  

   },
   error: function(request, status, error){
       console.log("Error");
       console.log(request)
       console.log(status)
       console.log(error)
   }
});




});
