const express = require('express');
const Router = express.Router();


Router.get('/', (req, res) => {
    res.send(' hey its working');
});


module.exports = Router;