// GLOBAL VARIABLES
// ===========================================================
var emotions = ["lost", "tired", "confused", "frustrated", "mind blown",]






// FUNCTIONS
// ===========================================================
function renderButtons() {
    $("#button-view").empty();

    for (var i=0; i<emotions.length; i++){
        var a = $("<button>");
        a.addClass("something-button");
        a.attr("data-name",emotions[i]);
        a.attr("class","btn btn-default");
        a.attr("type","button");
        a.text(emotions[i]);
        $("#button-view").append(a);
    }
}

function displayGIFS () {
    $("#something-view").empty();
    var thing = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      thing + "&api_key=ZP8beXwuh0QLgysjT4cvXLGm02mlbgFn&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var thingImage = $("<img>");
            thingImage.attr("src", results[i].images.fixed_height_still.url);
            thingImage.attr("data-still", results[i].images.fixed_height_still.url);
            thingImage.attr("data-animate", results[i].images.fixed_height.url);
            thingImage.attr("data-state", "still");
            thingImage.attr("class", "gif");
            
            // TESTING
            // console.log(results[i]);
           
            gifDiv.append(p);
            gifDiv.append(thingImage);

            $("#something-view").prepend(gifDiv);
          }
        }
      });
}




// PROCESS
// ===========================================================
renderButtons();

$("#add-something").on("click", function(event) {
    event.preventDefault();
    var newThing = $("#something-input").val().trim();
    emotions.push(newThing);
    renderButtons();
    $("#something-input").val("");
});

$(document).on("click", "button", displayGIFS);

$(document).on("click", ".gif", function() {
    // TESTING
    // console.log("clicked");
    
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });