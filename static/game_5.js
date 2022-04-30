$(document).ready(function(){


    // Create and hide step complete message
    let message = document.getElementById('message');
    message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
    message.style.visibility = 'hidden';

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

  $("#smoke").hide()
  $("#oiled-pan").hide();
  $("#cooked-steak").hide()
  $("#arrow-next").click(function(){
      window.location.href="/game/6";

    })


  //Navigation bar
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");






    //Selected item is above other items while dragging
    $(".ingredient").mouseenter(
        function() {
        $(this).css("z-index", "4");
        }
    );
    $(".ingredient").mouseleave(
        function() {
          $(this).css("z-index", "2");
        }
        );

 
  //Draggable items
  $("#frozen-steak").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#frozen-steak").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#frozen-steak").find(".description").show();
        }
  });

  $("#thyme").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#thyme").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#thyme").find(".description").show();
        }
  });

  $("#cut-butter").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#cut-butter").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#cut-butter").find(".description").show();
        }
  });

  $("#cut-garlic").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#cut-garlic").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#cut-garlic").find(".description").show();
        }
  });

  $("#salt").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#salt").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#salt").find(".description").show();
        }
  });

  $("#pepper").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#pepper").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#pepper").find(".description").show();
        }
  });

  $("#olive-oil").draggable({
        revert: "valid",
        start: function( event, ui ) {
          $("#olive-oil").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#olive-oil").find(".description").show();
        }
  });


  $("#seasoned-steak").draggable({
    revert: "invalid",
    start: function( event, ui ) {
      $("#seasoned-steak").find(".description").hide();
    },
    stop: function( event, ui ) {
      $("#seasoned-steak").find(".description").show();
    }
}); 

  $("#knife").draggable({
        revert: "invalid"
  });


  //Droppable items
  $("#cutting-board").droppable({
    accept: false
  });

  $("#empty-pan").droppable({
    accept: "#olive-oil"
  });

  $("#oiled-pan").droppable({
    accept: "#seasoned-steak"
  });


  setTimeout(function(){
    // $("#transition").html("hello")
    // var smoke_img = '<img id="smoke-img" src=actions["smoke"]["image"] alt=actions["smoke"]["description"]> </img>';
    // $("#smoke").append(smoke_img )
    $("#smoke").show().css("opacity", "0.5");


    }, 5000);


  $("#empty-pan").on("drop", function(event, ui) {
   

      $("#olive-oil").hide();
      let new_oil = $("<img>");
      new_oil.attr("src", ingredients["olive-oil"]["image"]);
      new_oil.attr("alt", ingredients["olive-oil"]["description"]);
      $(new_oil).addClass("new_oil");



      console.log(new_oil)
      $("#olive-oil-tilted").append(new_oil);


  });

    //Action when new oil is clicked
  $("#olive-oil-tilted").click(function(){
 
    $("#smoke").hide()
    $("#olive-oil-tilted").css("transform","rotate(40deg)");
    $("#empty-pan").hide();
    $("#oiled-pan").show();
    $("#olive-oil-tilted").mouseleave(function(){
      $("#olive-oil-tilted").hide();
      $("#olive-oil").show();
    })


    // Show arrow
    document.getElementById("arrow-next").style.visibility = 'visible';

    // Show message
    document.getElementById("message").style.visibility = 'visible';

    setTimeout(function(){
      $("#smoke").show();
      
      
    },3000)
      $.ajax({
        type: "POST",
        url: "/increase_score",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
          setTimeout(function() {
              window.location.href="/game/6";
          }, 10000);



        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });






 });



})
