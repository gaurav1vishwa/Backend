const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0,
    },

    isadmin: {
        type: Boolean,

    },

    bgcolor: {
        type: String,
    },

    panelcolor: {
        type: String,
    },

    textcolor: {
        type: String,
    }
});

module.exports = mongoose.model('Product', productSchema);