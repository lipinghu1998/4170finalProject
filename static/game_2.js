$(document).ready(function(){

  //Navigation Menu activate - Game
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");

  // Create and hide step complete message
  let message = document.getElementById('message');
  message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
  message.style.visibility = 'hidden';

  let raw_steak_img = $("<img>");
  raw_steak_img.attr("src", ingredients["steak"]["raw"]["image"]);
  raw_steak_img.attr("alt", ingredients["steak"]["raw"]["description"]);
  raw_steak_img.attr("id", "raw-steak-img");
  $("#raw-steak").append(raw_steak_img);

  function show_fire(){
    let fire_gif = $("<img>");
    fire_gif.attr("src", actions["fire"]["image"]);
    fire_gif.attr("alt", actions["fire"]["description"]);
    fire_gif.attr("id", "fire-gif-med");
    $("#fire").append(fire_gif);
  }

  $("#med").one("click", function(){
    show_fire();

    // Show message
    document.getElementById("message").style.visibility = 'visible';

    //Increase score on server side
    $.ajax({
      type: "POST",
      url: "/increase_score",
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify({"check":"success"}),
      success: function(response){
        setTimeout(function() {
            window.location.href="/game/3";
        }, 7000);
      },
      error: function(request, status, error){
          console.log("Error");
          console.log(request)
          console.log(status)
          console.log(error)
      }
    });
  });

  //Move to next step
  $("#arrow-next").click(function(){
    window.location.href="/game/3";
  })

  //Hints
  if(stat["hints"]>0){
    $("#hints").show();
  }

  //Move to next step
  $("#hints").click(function(){
    if(stat["hints"]>0){
      //Decrease hints on server side
      $.ajax({
        type: "POST",
        url: "/decrease_hints",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
          $("#hints").hide();
          $("#instruction").html(instruction["description"]);
        },
        error: function(request, status, error){
          console.log("Error");
          console.log(request)
          console.log(status)
          console.log(error)
        }
      });
    }
  })
});
