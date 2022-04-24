$(document).ready(function(){
    let clickState = 0;
    // $("#empty-pan").remove();
    $("#finished-steak").hide();
    $("#arrow-next").hide();

    //Navigation Menu activate- Learn
    $("#nav_learn").addClass("active");
    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");

    $("#arrow-next").click(function(){
      window.location.href="/learn/11";
    })

    // Set current instruction
    $("#instruction").html(instruction["description"]);

    // Tip 1: turn fire off by clicking pan
    let one = $('<p id="sub-instruction" style="color:red; position:fixed; left:820px; font-size: 14px; top:300px;">Click the pan to turn the fire off</p>').appendTo('#text');

    function hide_fire(){
      $("#fire").hide();
    }

    function hide_pan_steak(){
        $("#filled-pan").hide();

        let empty_pan = $("<img>");
        empty_pan.attr("src", utensils["pan"]["empty"]["image"]);
        empty_pan.attr("alt", utensils["pan"]["empty"]["description"]);
        empty_pan.attr("id", utensils["pan"]["empty"]["id"]);
        $("#pan").append(empty_pan);

        $("#finished-steak").show();

        // timer is set to 5 mins
        $("#timer").hover(
            function() {
            $("#timer").css("cursor","pointer");
            }
        );


        $("#timer").html("00:05:00");
        //$("#timer-label").html("Start the timer!");

        function timer(minutes, seconds){
            //Every 1 second equates to 10 second decrement
            let countdown = setInterval(function(){
                seconds-=30
                $("#timer").html("00:".concat(minutes.toString().padStart(2, '0')).concat(":").concat(seconds.toString().padStart(2, '0')));
                //When timer is over
                if(seconds==0){
                    if(minutes==0){
                        //Stop further decrement
                        clearInterval(countdown);
                        $("#timer").css("background-color","lightgray");

                        // $('<p>Complete! Press the arrow or wait for the page to timeout</p>').appendTo('#message');
                        $("#message").html("Complete! Press the arrow or wait for the page to timeout");
                        $("#arrow-next").show();

                        $("#timer-label").html("The steak is done resting!");
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

        //Minutes selected via tenderness
        let minutes = 5
        minutes-=1

        //Timer
        timer(minutes, 60);

        // WHEN TIMER CLICKED -
        $("#timer").click(function(){
            // disable timer from being clicked again
            $("#timer").off('click');
            $("#timer").hover(function() {$("#timer").css("cursor","default");});

            $.ajax({
                type: "POST",
                url: "/increase_steps_completed",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify({"check":"success"}),
                success: function(response){
                    $("#arrow-next").click(function(){
                        window.location.href="/learn/11";
                    })
                    setTimeout(function(){
                        window.location.href="/learn/11";
                    }, 10900);
                },
                error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
                }
            });
        });
    }

    console.log(clickState)

    $("#pan").click(function(){
        clickState ++;

        if (clickState == 1) {
            console.log(clickState)

            hide_fire();

            $('#sub-instruction').remove();
            let one = $('<p id="sub-instruction" style="color:red; position:fixed; left:820px; font-size: 14px; top:300px;">Click again to remove steak</p>').appendTo('#text');
        }
        else if (clickState == 2) {
            console.log(clickState)

            hide_pan_steak()

            $('#sub-instruction').remove();
        }
    })
})