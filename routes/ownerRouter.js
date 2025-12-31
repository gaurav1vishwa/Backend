const express = require('express');
const Router = express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');



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

Router.get('/adminAccess', (req, res) => {
let success=req.flash("success");
  res.render("admin", {success});
});


Router.get("/allProducts", async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");   // 🔧 ADD THIS
    res.render("shop", { products, success });
});


module.exports = Router;