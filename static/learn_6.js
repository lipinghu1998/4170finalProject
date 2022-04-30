$(document).ready(function(){

    // Hide next arrow
    document.getElementById("arrow-next").style.visibility = 'hidden';

    // Create and hide step complete message
    let message = document.getElementById('message');
    message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
    message.style.visibility = 'hidden';

    $("#smoke").hide()
    $("#alert-near-pan").empty();
    $("#alert-near-pan").append("<div class = row> Now drag when the pan smokes again </div>")
    $("#empty-pan").hide();
    $("#oiled-pan").show();
    $("#cooked-steak").hide()
    $("#arrow-next").click(function(){
        window.location.href="/learn/7";

      })


      setTimeout(function(){

        $("#smoke").show().css("opacity", "0.5");
    
    
        }, 5000);



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

  $("#instruction").html(instruction["description"]);



    //Arrow shown between ( seasoned-steak & pan)
    let arrow_steak = $("<img>");
    arrow_steak.attr("src", actions["arrow"]["label"]["image"]);
    arrow_steak.attr("alt", actions["arrow"]["label"]["description"]);
    $(arrow_steak).addClass("arrow_steak-style");
    $("#arrowUpdates").append(arrow_steak);


  $("#oiled-pan").on("drop",function(event, ui){
    $("#arrowUpdates").empty();
    
    $("#seasoned-steak").css("top", "360px");
    $("#seasoned-steak").css("left", "860px");
    $("#seasoned-steak-img").css("height", "110px");
    $("#seasoned-steak-img").css("width", "170px");

    // $("#seasoned-steak").addClass("smaller-steak")
    // $("#seasoned-steak-img").addClass("smaller-steak-img")
    console.log("dropped")
    $("#alert-near-pan").empty()
    $("#timer").html("00:01:00");
    
    $("#alert-near-timer").append("<div class = row> Start the timer for searing! </div>")

      $("#timer").mouseenter(
      function() {
        $("#timer").css("cursor","pointer");
        $("#timer").css("background-color","darkseagreen");
        }
      );

      $("#timer").mouseleave(
      function() {
        $("#timer").css("cursor","default");
        $("#timer").css("background-color","ghostwhite");
      }
      );

  })


         let  flip_steak = false
         function timer(minutes, seconds){

    
           //Every 1 second equates to 10 second decrement
           let countdown = setInterval(function(){
             seconds-=10
             $("#timer").html("00:".concat(minutes.toString().padStart(2, '0')).concat(":").concat(seconds.toString().padStart(2, '0')));
    
             //When timer is over
             
             if(seconds==0){
    
               if(minutes==0){
                 //Stop further decrement
                 clearInterval(countdown);
                 //When timer is over


                 if(flip_steak == false){
                  
                  // clearInterval(countdown);
                  $("#timer").html("00:01:00");
                  $("#alert-near-timer").empty();
                  $("#alert-near-pan").append("<div> Click the steak to turn it ! </div>");


                  $("#timer").off();
                  $("#timer").css("background-color","ghostwhite");
                  $("#timer").hover(
                    function() {
                      $("#timer").css("cursor","default");
                      $("#timer").css("background-color","ghostwhite");
                    }
                  );





                  $("#seasoned-steak").click(function(){
                      flip_steak = true
                      $("#seasoned-steak").hide();
                      $("#cooked-steak").show();
                      $("#alert-near-pan").empty();
                      $("#alert-near-timer").empty();
                      $("#alert-near-timer").append("<div> Now  click the timer again then the searing is done! </div>");

                      $("#timer").click(function(){
   

                      //Timer background green
                      $("#timer").css("background-color","darkseagreen");
                      $("#timer").hover(
                        function() {
                          $("#timer").css("cursor","default");
                          $("#timer").css("background-color","darkseagreen");
                        }
                      );
                      //Timer Label
                      $("#alert-near-timer").empty()
                      $("#alert-near-timer").append("<div> The timer is on! </div>")



                      //Minutes selected 
                      let minutes = 1;
                      minutes-=1
                      
                      //Timer
                      timer(minutes, 60); 




                  })



                      $("#timer").css("background-color","ghostwhite");

                      $("#timer").mouseenter(
                      function() {
                        $("#timer").css("cursor","pointer");
                        $("#timer").css("background-color","darkseagreen");
                        }
                      );

                      $("#timer").mouseleave(
                      function() {
                        $("#timer").css("cursor","default");
                        $("#timer").css("background-color","ghostwhite");
                      }
                      );

                  })
                 }else if(flip_steak == true){
                      $("#alert-near-timer").empty()
                                
                        // Show arrow
                      document.getElementById("arrow-next").style.visibility = 'visible';

                      // Show message
                      document.getElementById("message").style.visibility = 'visible';

                      $("#timer").off();
                      $("#timer").css("background-color","ghostwhite");
                      $("#timer").hover(
                        function() {
                          $("#timer").css("cursor","default");
                          $("#timer").css("background-color","ghostwhite");
                        }
                      );


                      $.ajax({
                        type: "POST",
                        url: "/increase_steps_completed",
                        dataType : "json",
                        contentType: "application/json; charset=utf-8",
                        data : JSON.stringify({"check":"success"}),
                        success: function(response){
                          setTimeout(function() {
                              window.location.href="/learn/7";
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
               else{
                 minutes-=1;
                 seconds=60;
                 timer(minutes, seconds)
               }
    
               //Actions after timer
    
             }
           }, 1000);
    
    
         }
        
        $("#timer").click(function(){
          // //Disable Timer from being clicked again
          // $("#timer").off('click');
          // if(flip_steak == false){   
            //   $("#timer").hover(
            //   function() {
            //     $("#timer").css("cursor","default");
            //   }
            // );

          //Timer background green
          $("#timer").css("background-color","darkseagreen");
          $("#timer").hover(
            function() {
              $("#timer").css("cursor","default");
              $("#timer").css("background-color","darkseagreen");
            }
          );
          //Timer Label
          $("#alert-near-timer").empty()
          $("#alert-near-timer").append("<div> The timer is on! </div>")




            //Minutes selected 
            let minutes = 1;
            minutes-=1
            
            //Timer
            timer(minutes, 60); 



        })

        
         
      


    
    

    



})

