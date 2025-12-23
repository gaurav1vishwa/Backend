const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractices`);

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String 
});

// Export model (SIRF EK BAAR, last me)
module.exports = mongoose.model("user", userSchema);

