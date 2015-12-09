
    "use strict";

    var throng = require("throng");
    var server = require("./appRouter");
    var WORKERS = process.env.WEB_CONCURRENCY || 1;


    throng( server, {
        workers: WORKERS,
        lifetime: Infinity
    });

