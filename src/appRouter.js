
    "use strict";

    var server = require("./server");
    var express = require("express");

    function NodeologyApplication(){

        var app = server();

        app.use(express.static('public'));
        app.get("/", require( "./pages/home" ) );
        app.post("/", require( "./pages/home" ) );
        app.get("/api/check/username/:username/:rnd", require( "./services/usernameCheck" ));

    }

    module.exports = NodeologyApplication;
