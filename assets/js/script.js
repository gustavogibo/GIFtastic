$(document).ready(function() {

    var gifButtonList = ["The Office", "House M.D", "How I met your mother", "Dexter", "Modern Family", "Stranger Things", "Mad Men", "The Big Band Theory", "Breaking Bad"];

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $(".gif-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifButtonList.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        var a = $("<button>");
        // Adding a class
        a.addClass("btn-generate-gifs btn btn-lg btn-warning");
        // Added a data-attribute
        a.attr("data-term", gifButtonList[i]);
        // Provided the initial button text
        a.text(gifButtonList[i]);
        // Added the button to the HTML
        $(".gif-buttons").append(a);

        // console.log(a);
        }

        // Creating the event that will communicate with Giphy API to bring Gifs results based on the
        // search term
        $(".btn-generate-gifs").on("click", function() {
            
            //removing all the previous gifs
            // $(".gifs-here").empty();

            // getting the term from the button and the API URL and combining both
            var term = $(this).attr("data-term");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              term + "&api_key=dc6zaTOxFJmzC&limit=10";
        
            //making the AJAX request
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              
              var results = response.data;
            
              // making a for loop to display all the gifs
              for (var i = 0; i < results.length; i++) {
        
                var termDiv = $("<div>");
                termDiv.addClass("col-12 col-sm-6 col-md-3");
        
                var card = $("<div>");
                card.addClass("card");
        
                var imgGif = $("<img>");
                imgGif.addClass("card-img-top img-fluid");
                imgGif.attr("src", results[i].images.fixed_height_still.url);
                imgGif.attr("alt", results[i].slug);
                imgGif.attr("data-still", results[i].images.fixed_height_still.url);
                imgGif.attr("data-moving", results[i].images.fixed_height.url);
                imgGif.attr("data-status", "still");
        
                var ratingGifDiv = $("<div>");
                ratingGifDiv.addClass("card-body text-center");
        
                var ratingGif = $("<p>");
                ratingGif.text("Rating: "+results[i].rating);
        
                ratingGifDiv.append(ratingGif);
        
                card.append(imgGif);
                card.append(ratingGifDiv);
        
                termDiv.append(card);
        
                $(".gifs-here").prepend(termDiv);
        
              }
        
            });

        });
    }

    // Whenever the user type the theme on the textbox to create a buttom, he can press
    // the "Enter" key instead and it will act like he clicked at the generate button gif.
    $(document).bind('keypress', function(event) {
        if(event.keyCode==13){
          event.preventDefault();
            $('#add-gif-button').trigger('click');

        }
    });

    // Event that will add the term typed on the textbox to be inside of the array gifButtonList
    // and eventually will call the function renderButtons
    $("#add-gif-button").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var term = $("#gif-term").val().trim();

        $("#gif-term").val("");

        // The movie from the textbox is then added to our array
        gifButtonList.push(term);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    renderButtons();

    //Event that will trigger the gif to be either still or animated
    $(document).on("click", ".card-img-top", function() {

      var img = $(this);

      var state = $(this).attr("data-status");
  
      if(state === "still") {
  
          var dataAnimate = $(this).attr("data-moving");
  
          $(this).attr("src", dataAnimate);
          $(this).attr("data-status", "animate");
  
        } else {
  
          $(this).attr("src", $(this).attr("data-still"))
          $(this).attr("data-status", "still");
  
        }
  
  
    });

});

