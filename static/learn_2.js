$(document).ready(function(){
  
  //Navigation Menu activate- Learn
  $("#nav_learn").addClass("active");

  $("#nav_home").removeClass("active");
  $("#nav_game").removeClass("active");

  //Set current instruction
  $("#instruction").html(instruction["description"]);

  let raw_steak_img = $("<img>");
  raw_steak_img.attr("src", ingredients["steak"]["raw"]["image"]);
  raw_steak_img.attr("alt", ingredients["steak"]["raw"]["description"]);
  raw_steak_img.attr("id", "raw-steak-img");
  $("#raw-steak").append(raw_steak_img);
          
  function show_fire(){
    let fire_gif = $("<img>");
    fire_gif.attr("src", actions["fire"]["image"]);
    fire_gif.attr("alt", actions["fire"]["description"]);
    fire_gif.attr("id", "fire-gif");
    $("#fire").append(fire_gif);
  }

  $("#med").one("click", function(){
    show_fire();            
  });

  //Move to next step
  $("#arrow-next").click(function(){
    window.location.href="/learn/3";
  })
});