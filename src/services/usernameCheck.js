
    "use strict";

    const fetch = require("../lib/fetch");
    const config = require("../config");

    module.exports = function( req, res ){

        var configVars = config( req.hostname,"en" );

        fetch( configVars.api.chkusr, { username: req.params.username  } ).then( function( result ){
            res.status( result.statusCode ).json({});
        }).catch( function( err ){
            res.status(404).json({});
        });
    };