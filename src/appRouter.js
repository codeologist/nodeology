
    "use strict";

    var server = require("./server");
    var express = require("express");

    function NodeologyApplication(){

        var app = server();

        app.use(express.static('public'));
        app.get("/", require( "./pages/home" ) );

    }

    module.exports = NodeologyApplication;
