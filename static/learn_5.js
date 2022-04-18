$(document).ready(function(){
    $("#smoke-img").hide()
    $("#arrow-next").click(function(){
        window.location.href="/game";
  
      })

    setTimeout(function(){
    // $("#transition").html("hello")
    // var smoke_img = '<img id="smoke-img" src=actions["smoke"]["image"] alt=actions["smoke"]["description"]> </img>';
    // $("#smoke").append(smoke_img )
    $("#smoke-img").show().css("opacity", "0.5");


    }, 5000);

    console.log("actions['smoke']['image']",actions['smoke']['image']);
  
  
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

    $("#instruction").html("(5)Coat the pan in oil once the pan begins to <b> smoke </b>")


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
        revert: "invalid",
        start: function( event, ui ) {
          $("#olive-oil").find(".description").hide();
        },
        stop: function( event, ui ) {
          $("#olive-oil").find(".description").show();
        }
  });

  $("#knife").draggable({
        revert: "invalid"
  });



  
    $("#empty-pan").on("drop", function(event, ui) {
        console.log("pan")
        alert("Dropped!");

    });
    $("#empty-pan").click( function(event, ui) {
        console.log("pan")

    });


  //Droppable items
  $("#cutting-board").droppable({
    accept: false
  });

  $("#empty-pan").droppable({
    accept: true
  });


})