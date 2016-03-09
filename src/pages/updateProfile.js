

    "use strict";

    const userProfile = require("../task/user-profile");

    const config = require("../config");

    module.exports= function( req, res){

        var configVars = config( req.hostname, "en" );

        userProfile.post( req.hostname,  req.cookies.nodeology, req.body ).then( function( profile ){

            configVars.user=profile;
            configVars.notifySuccess = "profile has been updated.";
            configVars.notifyFail=false;
            res.render("profile", configVars );

        }).catch( function(err){

            res.send( err )
        })
    };