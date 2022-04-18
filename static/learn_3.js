$("#instruction").html("(3) Drag the <b>salt</b> and <b>pepper</b> onto<br>the steak to season");
            
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
arrow_salt.attr("src", "images/arrow.png");
arrow_salt.attr("alt", "salt arrow");
$(arrow_salt).addClass("arrow-salt-style");
$("#arrow-salt").append(arrow_salt);

// Create arrow from pepper to steak
let arrow_pepper = $("<img>");
arrow_pepper.attr("src", "images/arrow.png");
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
        seasoned_steak.attr("src", "images/seasoned-steak.png");
        seasoned_steak.attr("alt", "Seasoned Steak");
        seasoned_steak.attr("id", "seasoned-steak-img");
        $("#raw-steak").append(seasoned_steak);

        let season_texture = $("<img>");
        season_texture.attr("src", "images/season-texture.png");
        season_texture.attr("alt", "Season Texture");
        season_texture.attr("id", "season-texture-img");
        $("#raw-steak").append(season_texture);
    }
}

$("#raw-steak-img").on("drop", function(event, ui){
    if(drag_salt == 1){
        drag_salt = 0;
        $("#salt").css("transform","rotate(135deg)");
        setTimeout(function() { 
            $("#salt").css("top", "120px");
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
            $("#pepper").css("top", "105px");
            $("#pepper").css("left", "550px");
            $("#pepper").css("transform","rotate(0deg)");
            steak_peppered = 1;
            replaceSteak();
        }, 1000);
        replaceSteak;
    }
});
}
