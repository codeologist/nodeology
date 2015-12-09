
    "use strict";

    var server = require("./server");


    function NodeologyApplication(){

        var app = server();
        app.get("/", require( "./pages/home" ) );

    }

    module.exports = NodeologyApplication;
