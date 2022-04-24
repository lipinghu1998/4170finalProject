$(document).ready(function(){

    //Navigation Menu activate - Learn
    $("#nav_learn").addClass("active");

    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");

    // Set current instruction
    $("#instruction").html(instruction["description"]);

    // Hide next arrow
    document.getElementById("arrow-next").style.visibility = 'hidden';

    // Create and hide step complete message
    let message = document.getElementById('message');
    message.innerHTML += 'Complete! Press the arrow or wait for the page to timeout';
    message.style.visibility = 'hidden';

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

    let raw_steak_img = $("<img>");
    raw_steak_img.attr("src", ingredients["steak"]["raw"]["image"]);
    raw_steak_img.attr("alt", ingredients["steak"]["raw"]["description"]);
    raw_steak_img.attr("id", "raw-steak-img");
    $("#raw-steak").append(raw_steak_img);

    let fire_gif = $("<img>");
    fire_gif.attr("src", actions["fire"]["image"]);
    fire_gif.attr("alt", actions["fire"]["description"]);
    fire_gif.attr("id", "fire-gif-med");
    $("#fire").append(fire_gif);

    $//Set current instruction
    $("#instruction").html(instruction["description"]);

    let steak_salted = 0;
    let steak_peppered = 0;
    let drag_salt = 0;
    let drag_pepper = 0;

    // Set salt and pepper images on cutting board
    $("#salt").css("top", "350px");
    $("#salt").css("left", "250px");
    $("#salt").css("z-index", "9");
    $("#pepper").css("top", "375px");
    $("#pepper").css("left", "200px");
    $("#pepper").css("z-index", "9");

    // Create arrow from salt to steak
    let arrow_salt = $("<img>");
    arrow_salt.attr("src", actions["arrow"]["label"]["image"]);
    arrow_salt.attr("alt", "salt arrow");
    $(arrow_salt).addClass("arrow-salt-style");
    $("#arrow-salt").append(arrow_salt);

    // Create arrow from pepper to steak
    let arrow_pepper = $("<img>");
    arrow_pepper.attr("src", actions["arrow"]["label"]["image"]);
    arrow_pepper.attr("alt", "pepper arrow");
    $(arrow_pepper).addClass("arrow-pepper-style");
    $("#arrow-pepper").append(arrow_pepper);

    // Make steak droppable for salt and pepper
    $("#raw-steak-img").droppable({
        accept: "#salt, #pepper"
    });

    // Actions for salt when dragged
    $("#salt").on("dragstart", function(event, ui){
        $("#arrow-salt").hide();
        drag_salt = 1;
    });

    $("#salt").on("dragstop", function(event, ui){
        drag_salt = 0;
    });

    // Actions for pepper when dragged
    $("#pepper").on("dragstart", function(event, ui){
        $("#arrow-pepper").hide();
        drag_pepper = 1;
    });

    $("#pepper").on("dragstop", function(event, ui){
        drag_pepper = 0;
    });

    // Replace steak image
    function replaceSteak(){
        if(steak_salted && steak_peppered){
            $("#raw-steak").empty();

            let seasoned_steak = $("<img>");
            seasoned_steak.attr("src", ingredients["steak"]["seasoned"]["image"]);
            seasoned_steak.attr("alt", ingredients["steak"]["seasoned"]["description"]);
            seasoned_steak.attr("id", "seasoned-steak-img");
            $("#raw-steak").append(seasoned_steak);

            let season_texture = $("<img>");
            season_texture.attr("src", actions["season"]["image"]);
            season_texture.attr("alt", actions["season"]["description"]);
            season_texture.attr("id", "season-texture-img");
            $("#raw-steak").append(season_texture);

            // Show arrow
            document.getElementById("arrow-next").style.visibility = 'visible';

            // Show message
            document.getElementById("message").style.visibility = 'visible';

            //Increase steps_completed on server side
            $.ajax({
                type: "POST",
                url: "/increase_steps_completed",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({"check":"success"}),
                success: function(response){
                  setTimeout(function() {
                      window.location.href="/learn/4";
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

    $("#raw-steak-img").on("drop", function(event, ui){
        if(drag_salt == 1){
            drag_salt = 0;
            $("#salt").css("transform","rotate(135deg)");
            setTimeout(function() {
                $("#salt").css("top", "170px");
                $("#salt").css("left", "500px");
                $("#salt").css("transform","rotate(0deg)");
                steak_salted = 1;
                replaceSteak();
            }, 1000);

        }
        else if(drag_pepper == 1){
            drag_pepper = 0;
            $("#pepper").css("transform","rotate(135deg)");
            setTimeout(function() {
                $("#pepper").css("top", "155px");
                $("#pepper").css("left", "550px");
                $("#pepper").css("transform","rotate(0deg)");
                steak_peppered = 1;
                replaceSteak();
            }, 1000);
            replaceSteak();
        }
    });

    //Move to next step
    $("#arrow-next").click(function(){
        window.location.href="/learn/4";
    });
});
