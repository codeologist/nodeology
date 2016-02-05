


    "use strict";

    const config = require("../config");

    module.exports= function( req,res){

        var configVars = config( req.hostname, "en" );

        res.render("logout", configVars );
    };