


    "use strict";

    const userProfile = require("../task/user-profile");

    const config = require("../config");

    module.exports= function( req,res){

        var configVars = config( req.hostname, "en" );

        configVars.user = userProfile.get();
        res.render("profile", configVars );
    };