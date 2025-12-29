const mongoose = require('mongoose');
const config = require("config");


const dbgr= require("debug")("development:mongoose");


mongoose
    .connect(`${config.get("MONGODVB_URI")}/EcommerceDB`)
    .then(function () {
        dbgr("MongoDB connected successfully.");
       
        
    })
    .catch(function (err) {
        dbgr("MongoDB connection error: ", err);
    });

module.exports = mongoose.connection;
