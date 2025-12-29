const express = require('express');
const Router = express.Router();
const ownerModel = require('../models/owner-model');

// this check is to node-vnv is set or undifined
console.log("Owner router loaded, NODE_ENV =", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
    Router.post('/create', async (req, res) => {

        console.log(req.body); // ✅ CORRECT PLACE

        let owner = await ownerModel.find();
        if (owner.length > 0) {
            return res.status(503).send("you do not have permission...");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname:fullname,
            email:email,
            password:password,
        });

        res.status(201).send(createdOwner);
       
    });
    

}

Router.get('/', (req, res) => {
    res.send(' hey its working');
});

Router.get('/admin', (req, res) => {
 let success=req.flash("success");
  res.render("createproducts", {success});
});


module.exports = Router;