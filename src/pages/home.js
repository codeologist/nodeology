
    "use strict";

    const config = require("../config");
    const fetch = require("../lib/fetch");
    const util = require("util");

    function validateUsername( username ){
        if ( !username.length ) {
            return "error";
        }
    }
    function validatePassword( password ){
        if ( !password.length ) {
            return "error";
        }
    }

    function Controller( host, lang ){
        this.hostname = host;
        this.lang=lang;
    }

    Controller.prototype.GET =  function( req, res ){

        var configVars = config( req.hostname,"en" );

        configVars.errors = {
            username:"",
            password:"",
            confirm:"",
            authenticated:false
        };
        configVars.post = {
            username:""
        };

        this.authorize(...arguments).then( function(){
            res.render( "authHome", configVars );
        }).catch( function(){
            res.render( "home", configVars );
        });
    };

    Controller.prototype.POST =  function( req, res ){
        if ( "register" in req.body ){
            this.register(...arguments).then( function( configVars ){
                configVars.registerSuccessText = util.format( configVars.lang.registerSuccessText, req.body.username );
                res.render( "home", configVars );
            }).catch(function( configVars ){
                configVars.post = {
                  username:req.body.username
                };
                res.render( "home", configVars );
            });
        }

        if ( "authenticate" in req.body ){
            this.authenticate(...arguments).then( function( configVars ){
                res.render( "authHome", configVars );
            }).catch(function( configVars ){

                configVars.loginFailText = configVars.lang.loginFailText;
                res.render( "home", configVars );
            });
        }
    };

    Controller.prototype.authenticate =  function( req, res ){
        return new Promise( function( resolve, reject ){
            var configVars = config( req.hostname, "en" );

            configVars.post = {
                username:"",
                authenticated:false
            };

            var data =  { username: req.body.username, password: req.body.password };

            fetch( configVars.api.authenticate, data ).then( function( result ){
                if ( result.statusCode === 200 ) {
                    res.cookie('nodeology', result.data.token, { domain: '', path: '/' });
                    resolve( configVars );
                }
                if ( result.statusCode === 400 ){
                    reject( configVars );
                }
            }).catch( function(){
                reject(configVars);
            });
        });
    };

    Controller.prototype.register =  function( req, res ){
        return new Promise( function( resolve, reject ){

            var configVars = config( req.hostname, "en" );

            configVars.post = {
                username:""
            };

            if ( req.body.username.length == 0 ||  req.body.password.length == 0 ||  req.body.password !== req.body.confirm ){
                reject( configVars );
            } else {

            var data =  { username: req.body.username, password: req.body.password };

            fetch( configVars.api.register, data ).then( function( result ){
                if ( result.statusCode === 201 ) {
                    resolve( configVars );
                }
                if ( result.statusCode === 400 ){
                    reject( configVars );
                }
            }).catch( function(){
                reject(configVars);
            });
            }
        });
    };

    Controller.prototype.authorize =  function( req, res ){
        return new Promise( function( resolve, reject ){

            var configVars = config( req.hostname, "en" );

            var data =  { token: req.cookies.nodeology  };

            fetch( configVars.api.authorize, data ).then( function( result ){

                if ( result.statusCode === 200 ) {
                    resolve( configVars );
                }
                if ( result.statusCode === 403 ){
                    reject( configVars );
                }
            }).catch( function(){
                reject(configVars);
            });
        });
    };

    module.exports = function( req, res ){
        (new Controller( req.hostname, "en" ))[req.method](...arguments);
    };