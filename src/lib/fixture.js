

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
                res.write("error");
            } else {

                res.cookie('nodeology', req.query.t, { domain: '', path: '/' });

                res.write("success");
            }

            res.end();
        });
    }
};