$(document).ready(function(){

  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");


  //Move to next step
  $("#arrow-next").click(function(){
      window.location.href="/game/1";

  })



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
  $(".ingredient").draggable({
        revert: "invalid",
        start: function( event, ui ) {
          $(this).find(".description").hide();
        },
        stop: function( event, ui ) {
          $(this).find(".description").show();
        }
  });

  $(".incorrect").draggable({
        revert: true,
        revertDuration: 2000,
        start: function( event, ui ) {
          $(this).find(".description").hide();
        },
        stop: function( event, ui ) {
          $(this).find(".description").show();
        }
  });




  //Droppable items
   $("#cutting-board").droppable({
     accept: ".ingredient, .incorrect"
   });




   let ingredient_count=0


  // When item is dropped
  $("#cutting-board").on("drop", function( event, ui ) {

      if(ui.draggable.hasClass("incorrect")){
        $("#cross").show();

        setTimeout(function() {
            $("#cross").hide();
        }, 2000);
      }
      else if(ui.draggable.hasClass("ingredient")){
        ui.draggable.draggable("disable");
        ingredient_count+=1
      }


      if(ingredient_count==7){


        //Increase score on server side
        $.ajax({
             type: "POST",
             url: "/increase_score",
             dataType : "json",
             contentType: "application/json; charset=utf-8",
             data : JSON.stringify({"check":"success"}),
             success: function(response){

               $("#ingredients-label").html("Complete! Press the arrow or wait for the page to timeout");

               setTimeout(function() {
                  window.location.href="/game/1";
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


  } );










});
