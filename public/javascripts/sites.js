$(document).ready(function(){
  $("#createSite").click(function(){
    
    var imgString = $("#imgURLInput").val();
    var uriString = $("#uriInput").val().toLowerCase();
    if (imgString.match(/\.(jpeg|jpg|gif|png)$/) != null){
      $("#formError").text("");
      $("#formError").removeClass("alert alert-danger");
      var check = unusedURICheck(uriString);
      
      if(check){ 
        
        var myobj = {URI: uriString, bio:$("#bioInput").val(), imgURL: imgString, password: $("#pwdInput").val()};
        jobj = JSON.stringify(myobj);
        console.log("HERE", jobj);
        var url = "submit";
        $.ajax({
          url:url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
            $.getJSON('site', function(data) {
              var cards = "";
              for(var site in data) {
                info = data[site];
                card = '<div class="col-sm-3"><div class="card"><div class="card-image"><img class="img-responsive" src=' + info.imgURL + '><span class="card-title">'+ info.URI +'</span></div><div class="card-content"><p>' + info.bio + '</p></div><div class="card-action"><a href="/site/' + info.URI + '" target="new_blank">See site</a></div></div></div>';
                cards+=card;
            }
              $("#cardList").html(cards);
           })
         }
        })
     }else {
       console.log("Duplicate URI string");
       $("#formError").text("You must include a unique URI string");
       $("#formError").addClass("alert alert-warning");
     }
   }else {
    console.log("IMPROPER IMAGE URL");
    $("#formError").text("You must include a valid image URL");
    $("#formError").addClass("alert alert-danger");
   }
  });

 function unusedURICheck(uriToSubmitString){
  
  var bool = true;
   $.ajax({
    url: "/site",
    type: "GET",
    dataType: 'json',
    async: false,
    success: function(data) {
      for(var site in data){
        var URI = data[site].URI;
        if(URI == uriToSubmitString){
          bool = false;
        }
      }
    }
  })
  
  return bool;
}
      
              
  $.getJSON('site', function(data) {
     var cards = "";
     for(var site in data) {
        info = data[site];
        card = '<div class="col-sm-3"><div class="card"><div class="card-image"><img class="img-responsive" src=' + info.imgURL + '><span class="card-title">'+ info.URI +'</span></div><div class="card-content"><p>' + info.bio + '</p></div><div class="card-action"><a href="/site/' + info.URI + '" target="new_blank">See site</a></div></div></div>';
      cards+=card;
      }
    $("#cardList").html(cards);
   })

});
