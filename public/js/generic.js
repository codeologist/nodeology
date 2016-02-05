

    $(document).ready(function(){
        var t1 = null;


        $(document).on("keyup", "#register [name=username]",function() {

            var username  = $(this);
            var label = $( "#register label.username" );
            var usernameText = username.val();


            clearTimeout(t1);
            t1 = setTimeout( function(){



                if ( usernameText.length ){
                    username.addClass("active").closest("form").addClass("waiting");
                    $.getJSON( "/api/check/username/" + usernameText + "/" + Math.random(), function() {
                        label.removeClass("valid").addClass("error").text("username is unavailable");
                        username.removeClass("active").closest("form").removeClass("waiting");
                    }).fail(function() {
                        label.removeClass("error").addClass("valid").text("username is available");
                        username.removeClass("active").closest("form").removeClass("waiting");
                    });
                }


            }, 1000);

        });

        $(document).on("keyup", "#register [name=confirm]", function() {
            var confirm = $(this);
            var label = $( "#register label.confirm" );
            var button = $( "#register button" );
            var password = $("#register [name=password]").val();

            if ( password === $(this).val() ){
                label.removeClass("error").text("confirm password");
                button.prop("disabled","")
            } else {
                label.addClass("error").text("passwords do not match");
                button.prop("disabled","disabled")
            }
        });

        $(document).on("submit", "#register", function( e ) {
           e.preventDefault();

            var form = $(this);
            var username = $( "#register [name=username]" ).val();

            form.addClass("waiting").find("button").addClass("active");

            $.post( form.attr("action"),form.serialize(), function( a, b, c){
                form.removeClass("waiting").find("button").removeClass("active");

                if ( c.status === 200 ){
                    $(".notify").remove();
                    $("h1").after('<div class="notify success"><span class="fa fa-check"></span>account '+username+' has been registered.</div>');
                    form[0].reset();
                    $( "#register label.username" ).removeClass("valid").text("username");
                    $( "#register label.confirm" ).removeClass("valid").text("confirm");
                }
            });


        });
    });