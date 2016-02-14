

"use strict";

const IoRedis = require("ioredis");
const crypto = require("crypto");

const DB = {
    port:      6379,
    host:       "localhost",
    password:   "",
    family:     4,
    db:         0
};




module.exports = {
    reguser: function (req, res) {

        var u = req.query.u;
        var p = req.query.p;

        var salt = crypto.randomBytes(256).toString();

        var userdata = {
            sitename: "localhost",
            username: u,
            password: crypto.createHash('sha1').update(p + salt).digest('hex'),
            salt: salt
        };

        new IoRedis(DB).hmset("USER:" + u, userdata, function (err) {
            if (err) {
                res.write("error");
            } else {
                res.write("success");
            }

            res.end();
        });
    },
    authUser:function( req, res ){
        new IoRedis( DB ).set( req.query.t, "", function ( err ) {

            if (err) {
                res.end("error");
            } else {



                new IoRedis( DB ).set( req.query.t, req.query.u, function ( err ) {

                    if ( err ){
                        res.end("error");
                    } else {

                        res.cookie('nodeology', req.query.t, { domain: '', path: '/' });
                        res.write("success");
                        res.end();
                    }
                });
            }
        });
    },
    postUpdate:function( req, res ){
        new IoRedis( DB ).set( req.query.t, "", function ( err ) {

            if (err) {
                res.end("error");
            } else {

                var host = req.query.h || "localhost";
                var username  = req.query.u || "mrnobody";
                var timestamp =  req.query.ts || new Date().getTime();
                var text = req.query.t;
                var uri = req.query.uri || "http://test.com/1234";
                var body2 ={};
                body2.host = host;
                body2.timestamp= timestamp;
                body2.text = text;
                body2.username = username;

                var m = new IoRedis( DB ).multi();
                m.lpush( "TIMELINE:" + host + ":" + username, uri  );
                m.hmset( uri, body2 );
                m.exec( function ( err,result ) {
                        res.write("posted");
                    res.end();
                });

            }
        });
    }
};