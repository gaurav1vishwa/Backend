const mongoose = require('mongoose');



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

    card: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      
    }],

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