
    "use strict";

    const fetch = require("../lib/fetch");
    const config = require("../config");
    const winston = require("winston");

    function get( appname, token ){
        return new Promise( function( resolve, reject ){

            winston.info("Getting profile");

            var configVars = config( appname,"en" );

            fetch( configVars.api.profile, {
                appname: appname,
                token: token
            },null,"GET").then( function( profile ){
                resolve( profile.data );
            }).catch( function( err ){
                reject( err );
            });
        });
    }

    function post( appname, token, data ){
        return new Promise( function( resolve, reject ){

            winston.info("Updating profile");

            var configVars = config( appname,"en" );
            fetch( configVars.api.profile, {
                appname: appname,
                token: token,
                data: data
            },null).then( function( profile ){
                resolve( profile.data );
            }).catch( function( err ){
                reject( err );
            });
        });
    }

    module.exports = {
        get:get,
        post:post
    };
