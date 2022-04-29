$(document).ready(function(){
    let fire_gif = $("<img>");
    fire_gif.attr("src", actions["fire"]["image"]);
    fire_gif.attr("alt", actions["fire"]["description"]);
    fire_gif.attr("id", "fire-gif-med");
    $("#fire").append(fire_gif);

    //Navigation Menu activate- Learn
    $("#nav_game").addClass("active");

    $("#nav_home").removeClass("active");
    $("#nav_learn").removeClass("active");

    //Move to next step
    $("#arrow-next").click(function(){
        window.location.href="/game/5";
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

    //counter
    // let step=4;

    //Selected item is above other items while dragging
    $(".ingredient").mouseenter(function(){
        $(this).css("z-index", "3");
    }
    );

    $(".ingredient").mouseleave(function(){
        $(this).css("z-index", "2");}
    );

    //Draggable items
    $("#frozen-steak").draggable({
          revert: "invalid"
    });

    $("#thyme").draggable({
          revert: "invalid"
    });

    $("#uncut-butter").draggable({
          revert: "invalid"
    });

    $("#uncut-garlic").draggable({
          revert: "invalid"
    });

    $("#salt").draggable({
          revert: "invalid"
    });

    $("#pepper").draggable({
          revert: "invalid"
    });

    $("#olive-oil").draggable({
          revert: "invalid"
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


    //Droppable-conditions
    // if(step==4){

    let clickState = 0;

    //await delay(5000);    // wait 5 sec
    //Set current instruction
    // $("#instruction").html(instruction["description"]);
    // $("#instruction").html("(4)<b> RUB STEAK </b>with excess salt and <br>pepper that fell onto the cutting board");

    // var one = $('<p id="sub-instruction" style="color:red; position:fixed; left:120px; top:310px;">Click the steak to learn how to properly season</p>').appendTo('#text');

    // once seasoned-steak clicked
    $("#seasoned-steak").click(function() {

        clickState++;

        if (clickState == 1) {   // shake the steak

        $('#seasoned-steak-img').addClass('shake');
            // $('#sub-instruction').remove();
            // setTimeout(function() {
            //   var two = $('<p id="sub-instruction" style="color:red; position:fixed; left:120px; top:310px;">Click the steak again to flip</p>').appendTo('#text');
            // }, 2000);
        }
        else if (clickState == 2) {   // flip the steak

            if($("#flip-box").css("transform") == 'none') {
                $("#flip-box").css("transform","rotateY(360deg)");
                $("#flip-box img").attr("src", ingredients["steak"]["flipped"]["image"]);
                $("#flip-box img").attr("id","seasoned-steak-img");
            }

            // $('#sub-instruction').remove();
            // setTimeout(function() {
            //   var two = $('<p id="sub-instruction" style="color:red; position:fixed; left:120px; top:310px;">Now click the steak again to season this side with the leftovers</p>').appendTo('#text');
            // }, 1000);

        }
        else if (clickState == 3) {   // shake the steak + make seasoning-texture disappear
            $('<p>Complete! Press the arrow or wait for the page to timeout</p>').appendTo('#message');

            $('#seasoned-steak').addClass('shake');
            $('#season-texture-img').fadeOut('slow');

            // $('#sub-instruction').remove();

            //Increase score on server side
            $.ajax({
                type: "POST",
                url: "/increase_score",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({"check":"success"}),
                success: function(response){
                    setTimeout(function() {
                        window.location.href="/game/5";
                    }, 7000);
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            });


        }
    });
});
