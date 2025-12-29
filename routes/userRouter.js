const express = require('express');
const Router = express.Router();


 const {
    resisterUser,
    loginUser,
    logoutUser
} =require('../controllers/authController');

Router.get('/', (req, res) => {
    res.send(' hey its working');
});

Router.post('/register', resisterUser);
   
 Router.post('/login', loginUser);
 Router.get("/logout", logoutUser);

module.exports = Router;