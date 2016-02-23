
    "use strict";

    var server = require("./server");
    var express = require("express");


    function NodeologyApplication(){

        var app = server();

        app.use(express.static('public'));
        app.get("/", require( "./pages/home" ) );
        app.post("/", require( "./pages/home" ) );
        app.get("/profile", require( "./pages/displayProfile" ) );
        app.post("/profile", require( "./pages/updateProfile" ) );


        app.get("/logout", require( "./pages/logout" ) );
        app.get("/api/check/username/:username/:rnd", require( "./services/usernameCheck" ));


        app.get("/nuke", require( "./lib/nuke" ));
        app.get("/fixture/reguser", require( "./lib/fixture" ).reguser);
        app.get("/fixture/authuser", require( "./lib/fixture" ).authUser);
        app.get("/fixture/upuser", require( "./lib/fixture" ).upduser);
        app.get("/fixture/postupdate", require( "./lib/fixture" ).postUpdate);

    }

    module.exports = NodeologyApplication;
