const express = require('express');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require('../models/user-model');

router.get('/', function (req, res) {
   let error = req.flash("error") || " ";
   res.render('index', { error,loggedin:false });
});

router.get("/shop", isLoggedin, async function(req, res){
    let products = await productModel.find();   // 🔧 FIX
    let success = req.flash("success");
    res.render("shop", { products, success });  // 🔧 FIX
});


router.get("/cart",isLoggedin, async function(req,res){
let user=await userModel.findOne({email:req.user.email}).populate("cart");
const bill =( Number(user.cart[0].price)+20)-Number(user.cart[0].discount);
res.render("cart",{user,bill});
});

router.get("/addtocart/:id",isLoggedin, async function(req,res){
 let user= await userModel.findOne({email:req.user.email});
 user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Product added to cart successfully");
    res.redirect("/shop");
});

router.get("/logout", function(req, res){
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});


module.exports = router;