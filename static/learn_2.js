//Set current instruction
$("#instruction").html(instruction["description"]);

let img = $("<img>");
img.attr("src", "images/raw-steak.png");
img.attr("alt", "Raw Steak");
img.attr("id", "raw-steak-img");
$("#raw-steak").append(img);
        
function show_fire(){
  let gif = $("<img>");
  gif.attr("src", "images/fire.gif");
  gif.attr("alt", "Fire");
  gif.attr("id", "fire-gif");
  $("#fire").append(gif);
}

$("#med").one("click", function(){
  show_fire();            
});

//Move to next step
$("#arrow-next").click(function(){
  window.location.href="/learn/3";
})

//Increase steps_completed on server side
$.ajax({
  type: "POST",
  url: "/increase_steps_completed",
  dataType : "json",
  contentType: "application/json; charset=utf-8",
  data : JSON.stringify({"check":"success"}),
  success: function(response){
    setTimeout(function() {
        window.location.href="/learn/3";
    }, 3300);
  },
  
  error: function(request, status, error){
      console.log("Error");
      console.log(request)
      console.log(status)
      console.log(error)
  }
});
