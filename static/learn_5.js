$(document).ready(function(){


    //Navigation Menu activate- Learn
    $("#nav_learn").addClass("active");

    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");
    
    // Hide next arrow
    document.getElementById("arrow-next").style.visibility = 'hidden';

    // Create and hide step complete message
    let message = document.getElementById('message');
    message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
    message.style.visibility = 'hidden';

    $("#smoke").hide()
    $("#oiled-pan").hide();
    $("#cooked-steak").hide()
    $("#arrow-next").click(function(){
        window.location.href="/learn/6";

      })


    console.log("actions['smoke']['image']",actions['smoke']['image']);

    //Arrow shown between (oil & pan)
    let arrow_oil = $("<img>");
    arrow_oil.attr("src", actions["arrow"]["label"]["image"]);
    arrow_oil.attr("alt", actions["arrow"]["label"]["description"]);
    $(arrow_oil).addClass("arrow-oil-style");
    $("#arrowUpdates").append(arrow_oil);

    //Navigation Menu activate- Learn
    $("#nav_learn").addClass("active");

    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");


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

  //Set current instruction
  $("#instruction").html(instruction["description"]);

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

  $("#uncut-butter").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#uncut-butter").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#uncut-butter").find(".description").show();
        }
  });

  $("#uncut-garlic").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $("#uncut-garlic").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#uncut-garlic").find(".description").show();
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
      $("#alert-near-pan").append("<div class = row> click the olive oil when pan is hot enough!</div>")
      $("#arrowUpdates").empty()
      console.log("pan")

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
    $("#alert-near-pan").empty();
    $("#smoke").hide()
    $("#olive-oil-tilted").css("transform","rotate(40deg)");
    $("#empty-pan").hide();
    $("#oiled-pan").show();
    $("#olive-oil-tilted").mouseleave(function(){
      $("#olive-oil-tilted").hide();
      $("#olive-oil").show();
    })
    // $("#oiled-pan").on("drop",function(event,ui){
    //   console.log("droped")
    //   $("#seasoned-steak").addClass("smaller-steak")

    // })


    // Show arrow
    document.getElementById("arrow-next").style.visibility = 'visible';

    // Show message
    document.getElementById("message").style.visibility = 'visible';

    setTimeout(function(){
      $("#smoke").show();
      console.log("smoking!!!")
      
    },3000)
      $.ajax({
        type: "POST",
        url: "/increase_steps_completed",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
          setTimeout(function() {
              window.location.href="/learn/6";
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
