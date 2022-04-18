$(document).ready(function(){


  //Start Learning click
  $("#nav_learn").click(function(){
      $.ajax({
     type: "POST",
     url: "/return_steps_completed",
     dataType : "json",
     contentType: "application/json; charset=utf-8",
     data : JSON.stringify({"check":"success"}),
     success: function(response){

       //If user has completed all steps
       if( parseInt(stat["steps_completed"])==parseInt(stat["total_steps"]) ){
         window.location.href="/learn/1";
       }
       else{
         let next_step=parseInt(response["steps_completed"])+1;
         window.location.href="/learn/".concat(next_step.toString());
       }



     },
     error: function(request, status, error){
         console.log("Error");
         console.log(request)
         console.log(status)
         console.log(error)
     }
   });

      })




});
