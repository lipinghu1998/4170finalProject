$(document).ready(function(){

  //Navigation Menu activate- Game
  $("#nav_home").addClass("active");

  $("#nav_learn").removeClass("active");
  $("#nav_game").removeClass("active");


  //Resume button
  $("#resume").click(function(){
      let next_step=parseInt(stat["steps_completed"])+1
      window.location.href="/learn/".concat(next_step.toString());
  })


  //If user has completed at least 1 but not all steps
  if( (parseInt(stat["steps_completed"])>0) && (parseInt(stat["steps_completed"])<parseInt(stat["total_steps"])) )
  {
    $("#resume").show();
  }
  else
  {
    $("#resume").hide();
  }


  //Start Learning click
  $("#start").click(function(){
        window.location.href="/learn/1";

  })




});
