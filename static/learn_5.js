$(document).ready(function(){
    $("#smoke").hide()
    $("#oiled-pan").hide();
    $("#arrow-next").click(function(){
        window.location.href="/game";

      })


    console.log("actions['smoke']['image']",actions['smoke']['image']);

    //Arrow shown between (oil & pan)
    let arrow_oil = $("<img>");
    arrow_oil.attr("src", actions["arrow"]["label"]["image"]);
    arrow_oil.attr("alt", actions["arrow"]["label"]["description"]);
    $(arrow_oil).addClass("arrow-oil-style");
    $("#arrow-oil").append(arrow_oil);

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




  $("#knife").draggable({
        revert: "invalid"
  });

  setTimeout(function(){
    // $("#transition").html("hello")
    // var smoke_img = '<img id="smoke-img" src=actions["smoke"]["image"] alt=actions["smoke"]["description"]> </img>';
    // $("#smoke").append(smoke_img )
    $("#smoke").show().css("opacity", "0.5");


    }, 2000);


    $("#empty-pan").on("drop", function(event, ui) {
        $("#arrow-oil").hide()
        console.log("pan")
        // $("#empty-pan").hide();
        // $("#oiled-pan").show();

        $("#olive-oil").hide();
        let new_oil = $("<img>");
        new_oil.attr("src", ingredients["olive-oil"]["image"]);
        new_oil.attr("alt", ingredients["olive-oil"]["description"]);
        $(new_oil).addClass("new_oil");



        console.log(new_oil)
        $("#olive-oil-2").append(new_oil);


    });

     //Action when knife is clicked
     $("#olive-oil-2").click(function(){
     $("#olive-oil-2").css("transform","rotate(60deg)");
     $("#empty-pan").hide();
     $("#oiled-pan").show();



      $.ajax({
        type: "POST",
        url: "/increase_steps_completed",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
          setTimeout(function() {
              window.location.href="/game";
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


    $("#olive-oil").click( function(event, ui) {
        console.log("oil")

    });


  //Droppable items
  $("#cutting-board").droppable({
    accept: false
  });

  $("#empty-pan").droppable({
    accept: "#olive-oil"
  });




})
