$(document).ready(function(){


  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");
  $("#nav_learn").removeClass("active");
  $("#nav_home").removeClass("active");


  //Move to next step
  $("#arrow-next").click(function(){
      window.location.href="/result";
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


  //Set timer label
  $("#timer-label").html("Start the timer after selecting desired tenderness!");

    //Selected item is above other on hover
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
            $(".ingredient").find(".description").hide();
          },
          stop: function( event, ui ) {
            $(".ingredient").find(".description").show();
          }
    });


    $("#spoon").draggable({
          revert: "invalid"
    });

    //Droppable items
     $("#target").droppable({
       accept: "#spoon"
     });

     //Set initial value of timer
     $("#timer").html("00:0".concat($('input[name="tenderness"]:checked').val()).concat(":00"));


     //Set initial tenderness option as bold
     $('input[name="tenderness"]:checked').parent().css("color","black");
     $('input[name="tenderness"]:checked').parent().css("font-weight","bold");


     //Toggle between tenderness options
     $('input[name="tenderness"]').click(function(){
       $("#timer").html("00:0".concat($(this).val()).concat(":00"));
       $(this).parent().css("font-weight","bold");
       $(this).parent().css("color","black");
       $(this).parent().siblings().css("font-weight","normal");
       $(this).parent().siblings().css("color","#999999");
     })

    //Check Variables
     let timer_check=false
     let pour_check=false
     let final_check=false;


     //Final Display
     function final_display()
     {

      final_check=true;

      //Increase score on server side
       $.ajax({
            type: "POST",
            url: "/increase_score",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify({"check":"success"}),
            success: function(response){
              $("#spoon").hide();
              $("#target").hide();
              $("#ingredients-label").html("Complete! Press the arrow or wait for the page to timeout");

               setTimeout(function() {
                  window.location.href="/result";
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


     //Timer logic
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
             $("#timer").css("background-color","ghostwhite");

             timer_check=true


             if(pour_check){
              if(final_check==false){
                  final_display();
               }
             }


           }
           else{
             minutes-=1;
             seconds=60;
             timer(minutes, seconds)
           }



         }
       }, 1000);


     }



     //Timer Click
     $("#timer").click(function(){

       //Disable Timer from being clicked again
        $("#timer").off('click');

        $("#timer").hover(
          function() {
            $("#timer").css("cursor","default");
          }
        );

       //Timer background green
       $("#timer").css("background-color","darkseagreen");

       //Timer Label
       $("#timer-label").html("");

       //Pan Label
       $("#pan-label").html("Click on spoon to scoop melted butter");

       //Scoop melted butter
       $("#spoon").click(function(){
         $("#spoon").attr("src", utensils["spoon"]["oiled"]["image"]);
         $("#spoon").css("transform", "rotate(5deg)");
         $("#spoon").css("top", "387px");
         $("#spoon").css("left", "965px");
         $("#spoon").css("height", "70px");
         $("#spoon").css("width", "100px");

         $("#target").show();

         $("#pan-label").html("Drag and drop spoon on the steak");

       })


       // Drop oiled spoon on steak
       $("#target").on("drop", function( event, ui ) {

          setTimeout(function() {
            $("#spoon").attr("src", utensils["spoon"]["empty"]["image"]);
            $("#spoon").css("transform", "rotate(250deg)");
            $("#spoon").css("top", "360px");
            $("#spoon").css("left", "970px");
            $("#spoon").css("height", "110px");
            $("#spoon").css("width", "110px");

            $("#target").hide();

            $("#pan-label").html("Click on spoon to scoop melted butter");

          }, 2000);

          pour_check=true

          if(timer_check){
            if(final_check==false){
              final_display();
            }
          }


         });


         //Minutes selected via tenderness
         let minutes = parseInt($('input[name="tenderness"]:checked').val());
         minutes-=1

         //Timer
         timer(minutes, 60);






     })























});
