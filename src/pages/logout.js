


    "use strict";

    const config = require("../config");

    module.exports= function( req,res){

        var configVars = config( req.hostname, "en" );

        res.clearCookie("nodeology");
        res.render("logout", configVars );
    };