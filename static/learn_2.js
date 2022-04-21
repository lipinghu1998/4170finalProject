$(document).ready(function(){
  
  //Navigation Menu activate - Learn
  $("#nav_learn").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_game").removeClass("active");

  // Set current instruction
  $("#instruction").html(instruction["description"]);  

  // Hide next arrow
  document.getElementById("arrow-next").style.visibility = 'hidden';

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
    
    //Increase steps_completed on server side
    $.ajax({
      type: "POST",
      url: "/increase_steps_completed",
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify({"check":"success"}),
      success: function(response){
        setTimeout(function() {
            window.location.href="/learn/3";
        }, 10000);
      },
      error: function(request, status, error){
          console.log("Error");
          console.log(request)
          console.log(status)
          console.log(error)
      }
    });

    // Show arrow
    document.getElementById("arrow-next").style.visibility = 'visible';

    // Show message
    document.getElementById("message").style.visibility = 'visible';
  });

  //Move to next step
  $("#arrow-next").click(function(){
    window.location.href="/learn/3";
  })
});