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
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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

        $(".btn-generate-gifs").on("click", function() {
            
            $(".gifs-here").empty();

            var term = $(this).attr("data-term");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              term + "&api_key=dc6zaTOxFJmzC&limit=10";
        
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
              // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
        
              // console.log(response);
        
              // Step 2: since the image information is inside of the data key,
              // make a variable named results and set it equal to response.data
              var results = response.data;
            //   console.log(results);
        
              // =============== put step 2 in between these dashes ==================
        
              // ========================
        
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
                ratingGifDiv.addClass("card-body");
        
                var ratingGif = $("<p>");
                ratingGif.text("Rating: "+results[i].rating);
        
                ratingGifDiv.append(ratingGif);
        
                card.append(imgGif);
                card.append(ratingGifDiv);
        
                termDiv.append(card);
        
                $(".gifs-here").prepend(termDiv);
        
        
              // Step 3: uncomment the for loop above and the closing curly bracket below.
              // Make a div with jQuery and store it in a variable named animalDiv.
              // Make a paragraph tag with jQuery and store it in a variable named p.
              // Set the inner text of the paragraph to the rating of the image in results[i].
              // Make an image tag with jQuery and store it in a variable named animalImage.
              // Set the image's src to results[i]'s fixed_height.url.
              // Append the p variable to the animalDiv variable.
              // Append the animalImage variable to the animalDiv variable.
              // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        
              // ============= put step 3 in between these dashes ======================
        
              // ==================================
              }
        
            });
        });
    }

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

});

