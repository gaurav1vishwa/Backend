const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    products: {
        type: Array,
        default: [],
    },

    Picture: {
        type: String,

    },

    gst: {
        type: String,
    }
});

module.exports = mongoose.model('owner', ownerSchema);