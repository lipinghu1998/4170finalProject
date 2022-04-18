$(document).ready(function(){


  $("#transition").click(function(){
    console.log("clicked!")
    window.location.href="/learn/5";

  })

  $("#arrow-next").click(function(){
      window.location.href="/game";

    })



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







$("#instruction").html("(1)<b> UNTHAW </b>the frozen steak");


$("#cutting-board").droppable( "option", "accept", "#frozen-steak");


$("#cutting-board").on("drop", function( event, ui ) {
  $("#arrow-steak").hide();

  $("#frozen-steak").find(".description").remove();
  $("#frozen-steak").css("top", "400px");
  $("#frozen-steak").css("left", "300px");
  $("#frozen-steak-img").css("height", "160px");
  $("#frozen-steak-img").css("width", "220px");



  $("#timer").hover(
    function() {
      $("#timer").css("cursor","pointer");
    }
  );

  $("#timer").html("00:30:00");
  $("#timer-label").html("Start the timer!");




  $("#timer").click(function(){
    $("#timer-label").html("Timer is on, while you wait, you can cut your butter and garlic!");

    $(".ingredient").css("opacity", "0.5");
    $("#cutting-board").css("opacity", "0.5");
    $("#empty-pan").css("opacity", "0.5");
    $("#temperature").css("opacity", "0.5");
    $("#temperature-labels").css("opacity", "0.5");


    $("#uncut-butter").css("opacity", "1");
    $("#uncut-garlic").css("opacity", "1");
    $("#uncut-butter").css("z-index", "7");
    $("#uncut-garlic").css("z-index", "7");
    $("#uncut-butter").addClass("paste");
    $("#uncut-garlic").addClass("paste");

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







    $("#popup").addClass("popup-style");

    let sub_instruction = $("<div>");
    sub_instruction.attr("id", "sub-instruction");
    sub_instruction.html("<b>Cut</b> your butter and garlic");


    $("#popup").append(sub_instruction);


    let sub_alert = $("<div>");
    sub_alert.attr("id", "sub-alert");
    sub_alert.html("");

    $("#popup").append(sub_alert);



    $("#knife").css("left", "330px");
    $("#knife").css("z-index", "7");

    let board = $("<img>");
    board.attr("src", utensils["cutting-board"]["image"]);
    board.attr("alt", utensils["cutting-board"]["description"]);
    board.attr("id",  "cutting-board-small");



    $("#popup").append(board);

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


    $("#cutting-board-small").droppable({
      accept: ".paste"
    });

    let butter_check= false;
    let garlic_check= false;




    $("#cutting-board-small").on("drop", function(event, ui) {



        if(ui.draggable.attr("id")=="uncut-butter"){
          $("#arrow-butter").hide();
          $("#uncut-butter").hide();

          let butter = $("<img>");
          butter.attr("src", ingredients["butter"]["uncut"]["image"]);
          butter.attr("alt", ingredients["butter"]["uncut"]["description"]);
          butter.attr("id", "popup-uncut-butter");

          $("#popup").append(butter);


          butter_check= true;
        }

        if(ui.draggable.attr("id")=="uncut-garlic"){
          $("#arrow-garlic").hide();
          $("#uncut-garlic").hide();

          let garlic = $("<img>");
          garlic.attr("src", ingredients["garlic"]["uncut"]["image"]);
          garlic.attr("alt", ingredients["garlic"]["uncut"]["description"]);
          garlic.attr("id", "popup-uncut-garlic");

          $("#popup").append(garlic);




          garlic_check= true;
        }

        if(butter_check && garlic_check){
          $("#knife").css("transform","rotate(270deg)");

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


          $("#popup-uncut-garlic").droppable({
            accept: "#knife"
          });



          let garlic_cut=false;
          let butter_cut=false;


          function close_popup(){




            $("#popup").hide();
            $("#knife").hide();

            let butter = $("<img>");
            butter.attr("src", ingredients["butter"]["cut"]["image"]);
            butter.attr("alt", ingredients["butter"]["cut"]["description"]);
            butter.attr("id", "cut-butter-img");

            let butter_label= $("<span>");
            butter_label.html("Butter")
            butter_label.addClass("description");

            $("#cut-butter").append(butter);
            $("#cut-butter").append(butter_label);


            let garlic = $("<img>");
            garlic.attr("src", ingredients["garlic"]["cut"]["image"]);
            garlic.attr("alt", ingredients["garlic"]["cut"]["description"]);
            garlic.attr("id", "cut-garlic-img");

            let garlic_label= $("<span>");
            garlic_label.html(ingredients["garlic"]["cut"]["description"])
            garlic_label.addClass("description");

            $("#cut-garlic").append(garlic);
            $("#cut-garlic").append(garlic_label);


            $("#cut-butter").draggable({
                  revert: "invalid",
                  start: function( event, ui ) {
                    $("#cut-butter").find(".description").hide();
                  },
                  stop: function( event, ui ) {
                    $("cut-butter").find(".description").show();
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


            $("#ingredients-label").html("Butter and garlic is now ready!");

            $("#timer").off('click');


            $("#timer").hover(
              function() {
                $("#timer").css("cursor","default");
              }
            );






          }

          $("#popup-uncut-garlic").on("drop", function(event, ui){
              $("#popup-arrow-garlic").hide();
              $("#popup-arrow-butter").hide();

              $("#knife").css("top", "400px");
              $("#knife").css("left", "490px");

              $("#sub-alert").html("Click on the knife to cut");

              $("#knife").click(function(){

                    garlic_cut=true;

                    $("#sub-alert").html("");

                    setTimeout(function() {
                        $("#knife").css("transform","rotate(300deg)");
                    }, 500);

                    setTimeout(function() {
                        $("#knife").css("transform","rotate(270deg)");
                    }, 1000);

                    setTimeout(function() {
                        $("#popup-uncut-garlic").hide();

                        let garlic = $("<img>");
                        garlic.attr("src", ingredients["garlic"]["cut"]["image"]);
                        garlic.attr("alt", ingredients["garlic"]["cut"]["description"]);
                        garlic.attr("id", "popup-cut-garlic");

                        $("#popup").append(garlic);


                    }, 1300);



                    if(butter_cut){
                      setTimeout(function() {
                          close_popup();
                      }, 3300);


                    }


              });




           });




           $("#popup-uncut-butter").droppable({
             accept: "#knife"
           });


           $("#popup-uncut-butter").on("drop", function(event, ui){
             $("#popup-arrow-garlic").hide();
             $("#popup-arrow-butter").hide();

             $("#sub-alert").html("Click on the knife to cut");

             $("#knife").css("top", "380px");
             $("#knife").css("left", "660px");

             $("#knife").click(function(){

                  butter_cut=true;

                  $("#sub-alert").html("");

                   setTimeout(function() {
                       $("#knife").css("transform","rotate(300deg)");
                   }, 500);

                   setTimeout(function() {
                       $("#knife").css("transform","rotate(270deg)");
                   }, 1000);

                   setTimeout(function() {
                       $("#popup-uncut-butter").hide();

                       let butter = $("<img>");
                       butter.attr("src", ingredients["butter"]["cut"]["image"]);
                       butter.attr("alt", ingredients["butter"]["cut"]["description"]);
                       butter.attr("id", "popup-cut-butter");

                       $("#popup").append(butter);


                   }, 1300);


                   if(garlic_cut){
                     setTimeout(function() {
                         close_popup();
                     }, 3300);
                   }
             });






            });




        }



    });




    let minutes = 30;

    var countdown = setInterval(function(){
      minutes-=2
      $("#timer").html("00:".concat(minutes.toString().padStart(2, '0')).concat(":00"));
      if(minutes==0){
        clearInterval(countdown);

        $(".ingredient").css("opacity", "1");
        $("#cutting-board").css("opacity", "1");
        $("#empty-pan").css("opacity", "1");
        $("#temperature").css("opacity", "1");
        $("#temperature-labels").css("opacity", "1");


        $("#timer-label").html("The steak is now unthawed!");

        $("#frozen-steak").hide();

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
