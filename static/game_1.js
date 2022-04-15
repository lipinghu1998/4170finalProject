$(document).ready(function(){


  $("#arrow-next").click(function(){
      window.location.href="/result";

    })



  //Navigation Menu activate- Game
  $("#nav_game").addClass("active");

  $("#nav_learn").removeClass("active");
  $("#nav_home").removeClass("active");




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


$("#cutting-board").on("drop", function( event, ui ) {


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



  $("#timer").click(function(){

    $(".ingredient").css("opacity", "0.5");
    $("#cutting-board").css("opacity", "0.5");
    $("#empty-pan").css("opacity", "0.5");
    $("#temperature").css("opacity", "0.5");


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



    $("#knife").css("left", "330px");
    $("#knife").css("z-index", "7");

    let board = $("<img>");
    board.attr("src", utensils["cutting-board"]["image"]);
    board.attr("alt", utensils["cutting-board"]["description"]);
    board.attr("id",  "cutting-board-small");



    $("#popup").append(board);



    $("#cutting-board-small").droppable({
      accept: ".paste"
    });

    let butter_check= false;
    let garlic_check= false;




    $("#cutting-board-small").on("drop", function(event, ui) {



        if(ui.draggable.attr("id")=="uncut-butter"){
          $("#uncut-butter").hide();

          let butter = $("<img>");
          butter.attr("src", ingredients["butter"]["uncut"]["image"]);
          butter.attr("alt", ingredients["butter"]["uncut"]["description"]);
          butter.attr("id", "popup-uncut-butter");

          $("#popup").append(butter);


          butter_check= true;
        }

        if(ui.draggable.attr("id")=="uncut-garlic"){
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



            $("#timer").off('click');


            $("#timer").hover(
              function() {
                $("#timer").css("cursor","default");
              }
            );

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

          $("#popup-uncut-garlic").on("drop", function(event, ui){
              $("#knife").css("top", "400px");
              $("#knife").css("left", "490px");

              $("#knife").click(function(){

                    garlic_cut=true;


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


             $("#knife").css("top", "380px");
             $("#knife").css("left", "660px");

             $("#knife").click(function(){

                  butter_cut=true;

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
