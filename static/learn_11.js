$(document).ready(function(){
    $("#filled-pan").hide();
    $("#fire").hide();
    console.log("HERE");

    let empty_pan = $("<img>");
    empty_pan.attr("src", utensils["pan"]["empty"]["image"]);
    empty_pan.attr("alt", utensils["pan"]["empty"]["description"]);
    empty_pan.attr("id", utensils["pan"]["empty"]["id"]);
    $("#pan").append(empty_pan);

    //Navigation Menu activate- Learn
    $("#nav_learn").addClass("active");
    $("#nav_home").removeClass("active");
    $("#nav_game").removeClass("active");

    // Set current instruction
    $("#instruction").html(instruction["description"]);

    $.ajax({
        type: "POST",
        url: "/increase_steps_completed",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"check":"success"}),
        success: function(response){
            $('<p>Complete! Press the arrow or wait for the page to timeout</p>').appendTo('#message');

            $("#arrow-next").click(function(){
                window.location.href="/game";
            })
            setTimeout(function() {
                window.location.href="/game";
            }, 5000);     // times out after 5s
        },
        error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
        }
    });
});
