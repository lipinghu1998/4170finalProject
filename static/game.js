   $(document).ready(function(){

   $("#nav_game").addClass("active");

  $("#nav_learn").removeClass("active");
  $("#nav_home").removeClass("active");


    $("#start_game").click(function(){
        window.location.href="/game/1";

      })

});