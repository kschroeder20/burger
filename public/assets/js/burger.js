$(function () {
    $(".new-burger").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        if ($("#burger-input").val().trim() === "") {
            alert("Enter soemthing into the search bar")
        } else {
            var newBurger = {
                burger_name: $("#burger-input").val().trim(),
                devoured: 0
            };
            // Send the POST request.
            $.post("/api/burgers", newBurger)
                .then(
                    function () {
                        console.log("created new burger");
                        // Reload the page to get the updated list
                        location.reload();
                    }
                );
        }
        });

    $(".devoured-btn").on("click", function (event) {
        var id = $(this).data("id");
        var newDevoured = 1;

        var newDevouredSate = {
            devoured: newDevoured
        }

        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: newDevouredSate
        }).then(
            function () {
                console.log(`changed sleep to ${newDevoured}`)
                location.reload();
            }
        );
    });
});