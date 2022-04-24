$(document).ready(function(){
  //Set current instruction
  $("#instruction").html(instruction["description"]);

  $("#arrow-next").click(function(){
      window.location.href="/game";
  })

  //Navigation Menu activate- Learn
  $("#nav_learn").addClass("active");
  $("#nav_home").removeClass("active");
  $("#nav_game").removeClass("active");

  $.ajax({
    type: "POST",
    url: "/increase_steps_completed",
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify({"check":"success"}),
    success: function(response){
      // setTimeout(function() {
      //   window.location.href="/game";
      // }, 80000);
    },
    error: function(request, status, error){
      console.log("Error");
      console.log(request)
      console.log(status)
      console.log(error)
    }
  });
});
