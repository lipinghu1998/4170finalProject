$(document).ready(function(){
    let fire_gif = $("<img>");
    fire_gif.attr("src", actions["fire"]["image"]);
    fire_gif.attr("alt", actions["fire"]["description"]);
    fire_gif.attr("id", "fire-gif-med");
    $("#fire").append(fire_gif);

    //Navigation Menu activate- Learn
    $("#nav_learn").addClass("active");

    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");

    //Move to next step

    $("#arrow-next").hide();
    $("#arrow-next").click(function(){
        window.location.href="/learn/5";
    })

    //Selected item is above other items while dragging
    $(".ingredient").mouseenter(
        function() {
        $(this).css("z-index", "3");
    });

    $(".ingredient").mouseleave(
        function() {
        $(this).css("z-index", "2");
    });

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
    $("#instruction").html(instruction["description"]);
    // $("#instruction").html("(4)<b> RUB STEAK </b>with excess salt and <br>pepper that fell onto the cutting board");

    var one = $('<p id="sub-instruction" style="color:red; font-weight:bold; position:fixed; left:120px; top:310px;">Click the steak to learn how to properly season</p>').appendTo('#text');

    // once seasoned-steak clicked
    $("#seasoned-steak").click(function() {

        clickState++;

        if (clickState == 1) {      // show rubbing-steak gif

            $('#sub-instruction').remove();

            let pop = $("#pop-up").addClass("pop-up-style");    // pop up of rubbing steak gif

            let gif = $("<img>");
            gif.attr("src", ingredients["steak"]["rubbing"]["image"]);
            gif.attr("alt", ingredients["steak"]["rubbing"]["description"]);
            gif.attr("id", ingredients["steak"]["rubbing"]["description"]);
            gif.css("height", "400px");

            $("#pop-up").append(gif);


            // let gif = $('<img src=ingredients["steak"]["rubbing"]["image"] height="400" alt=ingredients["steak"]["rubbing"]["description"] id="rubbing-steak-gif" />').appendTo('#pop-up');

            $(".ingredient").css("opacity", "0.5").delay(3000).fadeTo(1, 1);
            $("#cutting-board").css("opacity", "0.5").delay(3000).fadeTo(1, 1);
            $("#empty-pan").css("opacity", "0.5").delay(3000).fadeTo(1, 1);
            $("#temperature").css("opacity", "0.5").delay(3000).fadeTo(1, 1);
            $("#temperature-labels").css("opacity", "0.5").delay(3000).fadeTo(1, 1);

            setTimeout(function() {

                gif.fadeOut('fast');
                pop.fadeOut('fast');
                var two = $('<p id="sub-instruction" style="color:red; font-weight:bold; position:fixed; left:120px; top:310px;">Now click the steak to try it yourself</p>').appendTo('#text');
            }, 3000);

        }
        else if (clickState == 2) {   // shake the steak

            $('#seasoned-steak-img').addClass('shake');

            $('#sub-instruction').remove();

            setTimeout(function() {
                var two = $('<p id="sub-instruction" style="color:red; font-weight:bold; position:fixed; left:120px; top:310px;">Click the steak again to flip</p>').appendTo('#text');
            }, 2000);

        }
        else if (clickState == 3) {   // flip the steak

            if($("#flip-box").css("transform") == 'none') {
                    $("#flip-box").css("transform","rotateY(360deg)");
                    $("#flip-box img").attr("src", ingredients["steak"]["flipped"]["image"]);
                $("#flip-box img").attr("id","seasoned-steak-img");
            }

            $('#sub-instruction').remove();

            setTimeout(function() {
                var two = $('<p id="sub-instruction" style="color:red; font-weight:bold; position:fixed; left:120px; top:310px;">Now click the steak again to season this side with the leftovers</p>').appendTo('#text');
            }, 1000);

        }
        else if (clickState == 4) {   // shake the steak + make seasoning-texture disappear
            $("#arrow-next").show();

            $('#seasoned-steak').addClass('shake');
            $('#season-texture-img').fadeOut('slow');

            $('#sub-instruction').remove();

            $('<p>Complete! Press the arrow or wait for the page to timeout</p>').appendTo('#message');

            //Increase steps_completed on server side
            $.ajax({
                type: "POST",
                url: "/increase_steps_completed",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({"check":"success"}),
                success: function(response){
                setTimeout(function() {
                    window.location.href="/learn/5";
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
    });
});
