
    "use strict";
    const fetch = require("../lib/fetch");

    var db = new Set();


    module.exports = function( req, res ){
        if ( db.has(req.params.username) ){
            res.status(204).json({});
        } else {
            db.add(req.params.username);
            res.status(404).json({});
        }
    };