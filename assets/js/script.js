$(document).ready(function() {

    var gifButtonList = ["The Office", "House M.D", "How I met your mother", "Dexter", "Modern Family", "Stranger Things", "Mad Men", "The Big Band Theory", "Breaking Bad"];

    // $(".gif").on("click", function() {
        


    // });

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

        console.log(a);
        }
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