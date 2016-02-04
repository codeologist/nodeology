

"use strict";

const IoRedis = require("ioredis");


const DB = {
    port:      6379,
    host:       "localhost",
    password:   "",
    family:     4,
    db:         0
};




module.exports =  function( req,res){
    new IoRedis( DB).flushall();

    res.write("nuked");
    res.end();
};