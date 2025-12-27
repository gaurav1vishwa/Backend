const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    card: {
        type: Array,
        default: [],
    },

    isadmin: {
        type: Boolean,

    },

    ordders: {
        type: Array,
        default: [],
    },

    contact: {
        type: Number,
    },

    picture: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);