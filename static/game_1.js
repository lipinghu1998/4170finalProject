$(document).ready(function(){

  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_learn").removeClass("active");


  //Move to next step
  $("#arrow-next").click(function(){
      window.location.href="/result";

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


  //Droppable items
  $("#cutting-board").droppable({
    accept: false
  });

  $("#empty-pan").droppable({
    accept: false
  });

  $("#cutting-board").droppable( "option", "accept", "#frozen-steak");






//1. When Frozen Steak is dropped on Cutting Board
$("#cutting-board").on("drop", function( event, ui ) {

  //Increase size of frozen steak
  $("#frozen-steak").find(".description").remove();
  $("#frozen-steak").css("top", "400px");
  $("#frozen-steak").css("left", "300px");
  $("#frozen-steak-img").css("height", "160px");
  $("#frozen-steak-img").css("width", "220px");


  //Timer is set to 30 mins
  $("#timer").hover(
    function() {
      $("#timer").css("cursor","pointer");
    }
  );

  $("#timer").html("00:30:00");


  //2. When timer is clicked
  $("#timer").click(function(){

    //Disable Timer from being clicked again
    $("#timer").off('click');

    $("#timer").hover(
      function() {
        $("#timer").css("cursor","default");
      }
    );




    //Butter & Garlic z-index increased to enable drag over popup
    $("#uncut-butter").css("z-index", "7");
    $("#uncut-garlic").css("z-index", "7");

    //Butter & Garlic combined into one class- paste
    $("#uncut-butter").addClass("paste");
    $("#uncut-garlic").addClass("paste");


    //Butter & Garlic can move over other items on drag
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
            $.ajax({
                 type: "POST",
                 url: "/increase_score",
                 dataType : "json",
                 contentType: "application/json; charset=utf-8",
                 data : JSON.stringify({"check":"success"}),
                 success: function(response){
                   setTimeout(function() {
                       window.location.href="/result";
                   }, 1500);



                 },
                 error: function(request, status, error){
                     console.log("Error");
                     console.log(request)
                     console.log(status)
                     console.log(error)
                 }
            });


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
                      }, 3300);


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
                     }, 3300);
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

        //Hide frozen steak on cutting board
        $("#frozen-steak").hide();

        //Show raw steak on cutting board
        let img = $("<img>");
        img.attr("src", ingredients["steak"]["raw"]["image"]);
        img.attr("alt", ingredients["steak"]["raw"]["description"]);
        img.attr("id", "raw-steak-img");

        $("#raw-steak").append(img);

      }
    }, 1000);




  })





} );










});
