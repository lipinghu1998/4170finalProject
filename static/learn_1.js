$(document).ready(function(){

  //Navigation Menu activate- Learn
  $("#nav_learn").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_game").removeClass("active");


  //Move to next step
  $("#arrow-next").click(function(){
      window.location.href="/learn/2";

    })

  //Set current instruction
  $("#instruction").html(instruction["description"]);



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

  //Hide Arrow
  $("#arrow-steak").hide();

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
  $("#timer-label").html("Start the timer!");



  //2. When timer is clicked
  $("#timer").click(function(){

    //Change label above timer
    $("#timer-label").html("Timer is on, while you wait, you can cut your butter and garlic!");

    //Disable Timer from being clicked again
    $("#timer").off('click');

    $("#timer").hover(
      function() {
        $("#timer").css("cursor","default");
      }
    );

    //Blur the background
    $(".ingredient").css("opacity", "0.5");
    $("#cutting-board").css("opacity", "0.5");
    $("#empty-pan").css("opacity", "0.5");
    $("#temperature").css("opacity", "0.5");
    $("#temperature-labels").css("opacity", "0.5");

    //Garlic & Butter is not Blur
    $("#uncut-butter").css("opacity", "1");
    $("#uncut-garlic").css("opacity", "1");

    //Butter & Garlic combined into one class- paste
    $("#uncut-butter").addClass("paste");
    $("#uncut-garlic").addClass("paste");


    //Butter & Garlic z-index increased to enable drag over popup
    $("#uncut-butter").css("z-index", "7");
    $("#uncut-garlic").css("z-index", "7");


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

    let sub_instruction = $("<div>");
    sub_instruction.attr("id", "sub-instruction");
    sub_instruction.html(instruction["sub"]["0"]);
    $("#popup").append(sub_instruction);


    let sub_alert = $("<div>");
    sub_alert.attr("id", "sub-alert");
    sub_alert.html("");
    $("#popup").append(sub_alert);


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



    //Arrow shown between (butter & garlic) and popup
    let arrow_butter = $("<img>");
    arrow_butter.attr("src", actions["arrow"]["label"]["image"]);
    arrow_butter.attr("alt", actions["arrow"]["label"]["description"]);
    $(arrow_butter).addClass("arrow-butter-style");

    let arrow_garlic = $("<img>");
    arrow_garlic.attr("src", actions["arrow"]["label"]["image"]);
    arrow_garlic.attr("alt", actions["arrow"]["label"]["description"]);
    $(arrow_garlic).addClass("arrow-garlic-style");

    $("#arrow-butter").append(arrow_butter);
    $("#arrow-garlic").append(arrow_garlic);


    //To check if butter & garlic have been dropped
    let butter_dropped= false;
    let garlic_dropped= false;


    //3. An item dropped on small cutting board
    $("#cutting-board-small").on("drop", function(event, ui) {

        //Butter dropped
        if(ui.draggable.attr("id")=="uncut-butter"){
          $("#arrow-butter").hide();
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
          $("#arrow-garlic").hide();
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


          //Show arrows between (butter & garlic) and knife
          let arrow_butter = $("<img>");
          arrow_butter.attr("src", actions["arrow"]["label"]["image"]);
          arrow_butter.attr("alt", actions["arrow"]["label"]["description"]);
          $(arrow_butter).addClass("popup-arrow-butter-style");

          $("#popup-arrow-butter").append(arrow_butter);

          let arrow_garlic = $("<img>");
          arrow_garlic.attr("src", actions["arrow"]["label"]["image"]);
          arrow_garlic.attr("alt", actions["arrow"]["label"]["description"]);
          $(arrow_garlic).addClass("popup-arrow-garlic-style");

          $("#popup-arrow-garlic").append(arrow_garlic);




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

            //Alert user of success
            $("#ingredients-label").html("Butter and garlic is now ready!");


              $.ajax({
                   type: "POST",
                   url: "/increase_steps_completed",
                   dataType : "json",
                   contentType: "application/json; charset=utf-8",
                   data : JSON.stringify({"check":"success"}),
                   success: function(response){
                     $("#arrow-next").click(function(){
                         window.location.href="/learn/2";
                      })

                      setTimeout(function() {
                         window.location.href="/learn/2";
                      }, 3300);
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


              //Hide both garlic & butter arrows
              $("#popup-arrow-garlic").hide();
              $("#popup-arrow-butter").hide();

              //Knife moved above garlic
              $("#knife").css("top", "400px");
              $("#knife").css("left", "490px");

              $("#sub-alert").html("Click on the knife to cut");

              //Action when knife is clicked
              $("#knife").click(function(){

                    garlic_cut=true;

                    $("#sub-alert").html("");

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

             //Hide both garlic & butter arrows
             $("#popup-arrow-garlic").hide();
             $("#popup-arrow-butter").hide();

             $("#sub-alert").html("Click on the knife to cut");

             //Knife moved above butter
             $("#knife").css("top", "380px");
             $("#knife").css("left", "660px");


             //Action when knife is clicked
             $("#knife").click(function(){

                  butter_cut=true;

                  $("#sub-alert").html("");

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

        //Unblur the background
        $(".ingredient").css("opacity", "1");
        $("#cutting-board").css("opacity", "1");
        $("#empty-pan").css("opacity", "1");
        $("#temperature").css("opacity", "1");
        $("#temperature-labels").css("opacity", "1");

        //Give alert of success to user
        $("#timer-label").html("The steak is now unthawed!");

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
