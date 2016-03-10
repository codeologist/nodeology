
    "use strict";

    const config = require("../config");
    const fetch = require("../lib/fetch");
    const util = require("util");
    const moment = require("moment");


    function Controller( host, lang ){
        this.hostname = host;
        this.lang=lang;
    }

    Controller.prototype.GET =  function( req, res ){

        var configVars = config( req.hostname, "en" );

        configVars.errors = {
            username:"",
            password:"",
            confirm:"",
            authenticated:false
        };


        var self=this;
        var args = arguments;

        if ( !req.cookies.nodeology ){
            res.render( "home", configVars );
        } else {
            self.authorize(...args).then( function( user){

                self.timeline( ...args ).then( function( feed ){

                    feed.forEach( function( post ){
                        post.nicetime = moment( +post.timestamp ).format('LT');
                    });
                    configVars.feed = feed;
                    res.render( "authHome", configVars );//<< this needs to be a page object
                }).catch( function( feed ){
                    configVars.feed = feed;
                    res.render( "authHome",configVars );
                });
            }).catch( function( err ){
                res.render( "home", configVars );
            });
        }

    };

    Controller.prototype.POST =  function( req, res ){

        var configVars = config( req.hostname, "en" );

        if ( "userinput" in req.body ){
            this.addContent(...arguments).then( function(){
                res.redirect("/");
            }).catch( function( err ){
                configVars.errorText = configVars.lang.generalError;

                res.render( "authHome", configVars );
            });
        }

        if ( "register" in req.body ){
            this.register(...arguments).then( function(){

                configVars.notifySuccess = util.format( configVars.lang.registerSuccessText, req.body.username );
                res.render( "home", configVars );
            }).catch(function(){

                configVars.post.username=req.body.username;

                res.render( "home", configVars );
            });
        }

        if ( "authenticate" in req.body ){

                this.authenticate(...arguments).then(function () {

                    res.render("authHome", configVars);
                }).catch(function () {

                    configVars.notifyFail = configVars.lang.loginFailText;
                    res.render("home", configVars);
                });

        }
    };


    Controller.prototype.timeline =  function( req, res ){
        return new Promise( function( resolve, reject ){
            var configVars = config( req.hostname, "en" );
            fetch( configVars.api.timeline, { appname:req.hostname,token: req.cookies.nodeology  } ).then( function( result ){
                if ( result.statusCode === 200 ) {
                    resolve( result.data.timeline );
                }
                if ( result.statusCode === 400 ){
                    reject( [] );
                }
            }).catch( function(){
                reject([]);
            });
        });
    };

    Controller.prototype.addContent =  function( req, res ){
        return new Promise( function( resolve, reject ){
            var configVars = config( req.hostname, "en" );

            var data = {
                appname:req.hostname,
                token:  req.cookies.nodeology,
                text: req.body.content,
                uri: "http://localhost/post/postid" + Math.random()
            };

            fetch( configVars.api.addContent, data ).then( function( result ){
                if ( result.statusCode === 200 ) {
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


    Controller.prototype.authenticate =  function( req, res ){
        return new Promise( function( resolve, reject ){
            var configVars = config( req.hostname, "en" );


            var data =  { appname:req.hostname, username: req.body.username, password: req.body.password };

            fetch( configVars.api.authenticate, data ).then( function( result ){
                if ( result.statusCode === 200 ) {
                    res.cookie('nodeology', result.data.token, { domain: '', path: '/' });
                    resolve();
                }
                if ( result.statusCode === 400 ){
                    reject();
                }
            }).catch( function(){
                reject();
            });
        });
    };

    Controller.prototype.register =  function( req, res ){
        return new Promise( function( resolve, reject ){

            var configVars = config( req.hostname, "en" );


            if ( req.body.username.length == 0 ||  req.body.password.length == 0 ||  req.body.password !== req.body.confirm ){
                reject( configVars );
            } else {

            var data =  {  appname:req.hostname,username: req.body.username, password: req.body.password };

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

            var data =  {  appname:req.hostname,token: req.cookies.nodeology };

            fetch( configVars.api.authorize, data ).then( function( result ){

                if ( result.statusCode === 200 ) {
                    resolve( 200 );
                }
                if ( result.statusCode === 403 ){
                    reject( 403 );
                }
            }).catch( function(){
                reject(403);
            });
        });
    };

    module.exports = function( req, res ){
        (new Controller( req.hostname, "en" ))[req.method](...arguments);
    };