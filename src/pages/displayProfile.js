


    "use strict";

    const userProfile = require("../task/user-profile");

    const config = require("../config");

    module.exports= function( req, res){

        var configVars = config( req.hostname, "en" );

        userProfile.get( req.hostname,  req.cookies.nodeology ).then( function( profile ){

            configVars.user=profile;
            configVars.notifySuccess=false;
            configVars.notifyFail=false;

            res.render("profile", configVars );

        }).catch( function(err){

            res.send( err )
        })
    };