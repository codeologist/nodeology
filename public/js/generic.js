

    $(document).ready(function(){
        $("#register [name=username]").on("keyup", function() {

            var el = this;
            $(el).addClass("active").closest("form").addClass("waiting");


            $.getJSON( "/api/check/username/" + $(this).val() + "/" + Math.random(), function() {
                $( "#register label.username" ).removeClass("valid").addClass("error").text("username is unavailable");
                $(el).removeClass("active").closest("form").removeClass("waiting");
            }).fail(function() {
                $( "#register label.username" ).removeClass("error").addClass("valid").text("username is available");
                $(el).removeClass("active").closest("form").removeClass("waiting");


            });
        });
    });