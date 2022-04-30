$(document).ready(function(){
  //Navigation Menu activate - Learn
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");

  // Create and hide step complete message
  let message = document.getElementById('message');
  message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
  message.style.visibility = 'hidden';

  let drag_thyme = 0;
  let drag_garlic = 0;
  let drag_butter = 0;
  let thyme_dropped = 0;
  let garlic_dropped = 0;
  let butter_dropped = 0;

  $("#thyme").draggable({
    revert: "invalid",
    start: function( event, ui ) {
      $("#salt").find(".description").hide();
    },
    stop: function( event, ui ) {
      $("#salt").find(".description").show();
    }
  });

  $("#cut-garlic").draggable({
    revert: "invalid",
    start: function( event, ui ) {
      $("#pepper").find(".description").hide();
    },
    stop: function( event, ui ) {
      $("#pepper").find(".description").show();
    }
  });

  $("#cut-butter").draggable({
    revert: "invalid",
    start: function( event, ui ) {
      $("#pepper").find(".description").hide();
    },
    stop: function( event, ui ) {
      $("#pepper").find(".description").show();
    }
  });

  // Make pan droppable for thyme, garlic, and butter
  $("#empty-pan").droppable({
    accept: "#thyme, #cut-garlic, #cut-butter"
  });

  // Create fire gif
  let fire_gif = $("<img>");
  fire_gif.attr("src", actions["fire"]["image"]);
  fire_gif.attr("alt", actions["fire"]["description"]);
  fire_gif.attr("id", "fire-gif-med");
  $("#fire").append(fire_gif);

  // Position steak on pan
  let cooked_steak_img = $("<img>");
  cooked_steak_img.attr("src", ingredients["steak"]["cooked"]["image"]);
  cooked_steak_img.attr("alt", ingredients["steak"]["cooked"]["description"]);
  cooked_steak_img.attr("id", "cooked-steak-img");
  $("#cooked-steak").append(cooked_steak_img);

  // Actions for thyme when dragged
  $("#thyme").on("dragstart", function(event, ui){
    drag_thyme = 1;
  });

  $("#thyme").on("dragstop", function(event, ui){
    drag_thyme = 0;
  });

  // Actions for garlic when dragged
  $("#cut-garlic").on("dragstart", function(event, ui){
    drag_garlic = 1;
  });

  $("#cut-garlic").on("dragstop", function(event, ui){
    drag_garlic = 0;
  });

  // Actions for butter when dragged
  $("#cut-butter").on("dragstart", function(event, ui){
    drag_butter = 1;
  });

  $("#cut-butter").on("dragstop", function(event, ui){
    drag_butter = 0;
  });

  // Used to show next arrow when all 
  // three ingredients have been dropped
  function show_arrow(){
    if(thyme_dropped && garlic_dropped && butter_dropped){  
      // Show message
      document.getElementById("message").style.visibility = 'visible';
      
      // Increase steps_completed on server side
      $.ajax({
        type: "POST",
        url: "/increase_score",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
          setTimeout(function() {
              window.location.href="/game/8";
          }, 10000);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
      });
    }
  }

  $("#empty-pan").on("drop", function(event, ui){
    if(drag_thyme == 1){
      drag_thyme = 0;
      thyme_dropped = 1;
      show_arrow();
    }
    else if(drag_garlic == 1){
      drag_garlic = 0;
      garlic_dropped = 1;
      show_arrow();
    }
    else if(drag_butter == 1){
      drag_butter = 0;
      butter_dropped = 1;
      show_arrow();
    }
  });
  
  //Move to next step
  $("#arrow-next").click(function(){
    window.location.href="/game/8";
  });

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
