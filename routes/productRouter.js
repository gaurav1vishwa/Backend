const express = require('express');
const Router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');


Router.post("/create",upload.single('image'), async function (req, res) {
    try{
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product= await productModel.create({
        image:req.file.buffer,
        name:name,
        price:price,
        discount:discount,    
        bgcolor:bgcolor,
        panelcolor:panelcolor,
        textcolor:textcolor 
}); 
req.flash("success","Product created successfully");
res.redirect("/owner/admin ");
    }
    catch(err){
        res.send(err.message);
    }
});


module.exports = Router;