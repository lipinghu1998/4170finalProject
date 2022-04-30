$(document).ready(function(){

  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");


  //Move to next step
  $("#arrow-next").click(function(){
      window.location.href="/game/2";

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
               $("#instruction").html(instruction["description"].concat(" and ").concat(instruction["sub"][0]));

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
        $(".ingredient").find(".description").hide();
      },
      stop: function( event, ui ) {
        $(".ingredient").find(".description").show();
      }
  });

  $("#knife").draggable({
        revert: "invalid"
  });


  //Droppable items
  $("#cutting-board").droppable({
    accept: "#frozen-steak"
  });


  $("#empty-pan").droppable({
    accept: false
  });





//1. When Frozen Steak is dropped on Cutting Board
$("#cutting-board").on("drop", function( event, ui ) {

  //Increase size of frozen steak
  $("#frozen-steak").find(".description").remove();
  $("#frozen-steak").css("top", "400px");
  $("#frozen-steak").css("left", "300px");
  $("#frozen-steak-img").css("height", "160px");
  $("#frozen-steak-img").css("width", "220px");


  //Timer is set to 30 mins
  $("#timer").html("00:30:00");
  $("#timer-label").html("Start the timer!");


  //Timer-hover
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



  //2. When timer is clicked
  $("#timer").click(function(){

    //Disable Timer from being clicked again
    $("#timer").off('click');

    //Timer background-Green (Active)
    $("#timer").css("background-color","darkseagreen");
    $("#timer").hover(
      function() {
        $("#timer").css("cursor","default");
        $("#timer").css("background-color","darkseagreen");
      }
    );


    //Butter & Garlic combined into one class- paste
    $("#uncut-butter").addClass("paste");
    $("#uncut-garlic").addClass("paste");


    //z-index of ingredients increased to enable drag over popup
    $("#thyme").css("z-index", "7");
    $("#salt").css("z-index", "7");
    $("#pepper").css("z-index", "7");
    $("#olive-oil").css("z-index", "7");
    $("#uncut-butter").css("z-index", "7");
    $("#uncut-garlic").css("z-index", "7");


    //ingredients can move over other items on drag
    $("#thyme").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#thyme").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );

    $("#salt").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#salt").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );

    $("#pepper").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#pepper").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );

    $("#olive-oil").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#olive-oil").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );

    $("#uncut-butter").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#uncut-butter").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );

    $("#uncut-garlic").mouseenter(
    function() {
      $(this).css("z-index", "9");
    }
    );

    $("#uncut-garlic").mouseleave(
    function() {
      $(this).css("z-index", "7");
    }
    );


    //Popup is shown
    $("#popup").addClass("popup-style");

    //Knife is moved on popup
    $("#knife").css("left", "330px");
    $("#knife").css("z-index", "7");

    //Small cutting board is shown in popup
    let board = $("<img>");
    board.attr("src", utensils["cutting-board"]["image"]);
    board.attr("alt", utensils["cutting-board"]["description"]);
    board.attr("id",  "cutting-board-small");

    $("#popup").append(board);

    $("#cutting-board-small").droppable({
      accept: ".paste"
    });



    //To check if butter & garlic have been dropped
    let butter_dropped= false;
    let garlic_dropped= false;

    //Popup and Timer check
    let popup_check=false
    let timer_check=false

    function final_display(){

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
                window.location.href="/game/2";
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



    //3. An item dropped on small cutting board
    $("#cutting-board-small").on("drop", function(event, ui) {

        //Butter dropped
        if(ui.draggable.attr("id")=="uncut-butter"){
          $("#uncut-butter").hide();

          let butter = $("<img>");
          butter.attr("src", ingredients["butter"]["uncut"]["image"]);
          butter.attr("alt", ingredients["butter"]["uncut"]["description"]);
          butter.attr("id", "popup-uncut-butter");

          $("#popup").append(butter);

          butter_dropped= true;
        }

        //Garlic dropped
        if(ui.draggable.attr("id")=="uncut-garlic"){
          $("#uncut-garlic").hide();

          let garlic = $("<img>");
          garlic.attr("src", ingredients["garlic"]["uncut"]["image"]);
          garlic.attr("alt", ingredients["garlic"]["uncut"]["description"]);
          garlic.attr("id", "popup-uncut-garlic");

          $("#popup").append(garlic);

          garlic_dropped= true;
        }

        $("#popup-uncut-garlic").droppable({
          accept: "#knife"
        });
        $("#popup-uncut-butter").droppable({
          accept: "#knife"
        });




        //Butter & Garlic dropped on cutting board
        if(butter_dropped && garlic_dropped){

          //Rotate knife to indicate availibility to cut
          $("#knife").css("transform","rotate(270deg)");

          //Knife is above other items on drag
          $("#knife").mouseenter(
          function() {
            $(this).css("z-index", "9");
          }
          );

          $("#knife").mouseleave(
          function() {
            $(this).css("z-index", "7");
          }
          );


          //Variables to check if garlic & butter are cut
          let garlic_cut=false;
          let butter_cut=false;


          //Actions to be performed garlic & butter are cut
          function close_popup()
          {
            //Hide popup
            $("#popup").hide();

            //Hide knife
            $("#knife").hide();

            //Show cut butter along with other ingredients
            let butter = $("<img>");
            butter.attr("src", ingredients["butter"]["cut"]["image"]);
            butter.attr("alt", ingredients["butter"]["cut"]["description"]);
            butter.attr("id", "cut-butter-img");

            let butter_label= $("<span>");
            butter_label.html("Butter")
            butter_label.addClass("description");

            $("#cut-butter").append(butter);
            $("#cut-butter").append(butter_label);

            //Show cut garlic along with other ingredients
            let garlic = $("<img>");
            garlic.attr("src", ingredients["garlic"]["cut"]["image"]);
            garlic.attr("alt", ingredients["garlic"]["cut"]["description"]);
            garlic.attr("id", "cut-garlic-img");

            let garlic_label= $("<span>");
            garlic_label.html(ingredients["garlic"]["cut"]["description"])
            garlic_label.addClass("description");

            $("#cut-garlic").append(garlic);
            $("#cut-garlic").append(garlic_label);

            //Cut Butter is draggable
            $("#cut-butter").draggable({
                  revert: "invalid",
                  start: function( event, ui ) {
                    $("#cut-butter").find(".description").hide();
                  },
                  stop: function( event, ui ) {
                    $("cut-butter").find(".description").show();
                  }
            });

            //Cut Garlic is draggable
            $("#cut-garlic").draggable({
                  revert: "invalid",
                  start: function( event, ui ) {
                    $("#cut-garlic").find(".description").hide();
                  },
                  stop: function( event, ui ) {
                    $("#cut-garlic").find(".description").show();
                  }
            });


              //Increase score on server side
              popup_check=true;

              if(timer_check){
                final_display();
              }






          }


          //Make popup (garlic & butter) droppable
          $("#popup-uncut-garlic").droppable({
            accept: "#knife"
          });
          $("#popup-uncut-butter").droppable({
            accept: "#knife"
          });




          //4. Action when garlic is cut
          $("#popup-uncut-garlic").on("drop", function(event, ui){

              //Knife moved above garlic
              $("#knife").css("top", "400px");
              $("#knife").css("left", "490px");


              //Action when knife is clicked
              $("#knife").click(function(){

                    garlic_cut=true;

                    //Rotate knife on timeout to give appearance of 'cutting'
                    setTimeout(function() {
                        $("#knife").css("transform","rotate(300deg)");
                    }, 500);

                    setTimeout(function() {
                        $("#knife").css("transform","rotate(270deg)");
                    }, 1000);


                    setTimeout(function() {

                        //Hide uncut garlic image
                        $("#popup-uncut-garlic").hide();

                        //Show cut garlic image
                        let garlic = $("<img>");
                        garlic.attr("src", ingredients["garlic"]["cut"]["image"]);
                        garlic.attr("alt", ingredients["garlic"]["cut"]["description"]);
                        garlic.attr("id", "popup-cut-garlic");

                        $("#popup").append(garlic);


                    }, 1300);


                    //If butter is also cut, close popup
                    if(butter_cut){
                      setTimeout(function() {
                          close_popup();
                      }, 2200);


                    }


              });




           });



           //5. Action when buter is cut
           $("#popup-uncut-butter").on("drop", function(event, ui){

             //Knife moved above butter
             $("#knife").css("top", "380px");
             $("#knife").css("left", "660px");


             //Action when knife is clicked
             $("#knife").click(function(){

                  butter_cut=true;

                  //Rotate knife on timeout to give appearance of 'cutting'
                   setTimeout(function() {
                       $("#knife").css("transform","rotate(300deg)");
                   }, 500);

                   setTimeout(function() {
                       $("#knife").css("transform","rotate(270deg)");
                   }, 1000);

                   setTimeout(function() {

                       //Hide uncut butter image
                       $("#popup-uncut-butter").hide();

                       //Show cut butter image
                       let butter = $("<img>");
                       butter.attr("src", ingredients["butter"]["cut"]["image"]);
                       butter.attr("alt", ingredients["butter"]["cut"]["description"]);
                       butter.attr("id", "popup-cut-butter");

                       $("#popup").append(butter);


                   }, 1300);

                   //If garlic is also cut, close popup
                   if(garlic_cut){
                     setTimeout(function() {
                         close_popup();
                     }, 2200);
                   }
             });

          });

      }


    });


    //Timer for 30 mins
    let minutes = 30;

    //Each second equates to 2 mins
    var countdown = setInterval(function(){
      minutes-=2
      $("#timer").html("00:".concat(minutes.toString().padStart(2, '0')).concat(":00"));

      //When timer is over
      if(minutes==0){

        //Stop further decrement
        clearInterval(countdown);


        //Timer background- lightgray (Inactive)
        $("#timer").css("background-color","ghostwhite");
        $("#timer").hover(
          function() {
            $("#timer").css("cursor","default");
            $("#timer").css("background-color","ghostwhite");
          }
        );


        //Hide frozen steak on cutting board
        $("#frozen-steak").hide();

        //Show raw steak on cutting board
        let img = $("<img>");
        img.attr("src", ingredients["steak"]["raw"]["image"]);
        img.attr("alt", ingredients["steak"]["raw"]["description"]);
        img.attr("id", "raw-steak-img");

        $("#raw-steak").append(img);

        timer_check=true;

        if(popup_check){
          final_display();
        }


      }
    }, 1000);




  })





} );










});
