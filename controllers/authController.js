const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const productsModel = require('../models/product-model');


/* ================= REGISTER ================= */

module.exports.resisterUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "User already exists, please login");
            return res.redirect("/");   // same page popup
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/");
                }

                let user = await userModel.create({
                    email,
                    fullname,
                    password: hash,
                });

                let token = generateToken(user);
                res.cookie("token", token);

                req.flash("success", "User registered successfully");
                res.redirect("/shop");   // success popup on shop
            });
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
};


/* ================= LOGIN ================= */

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "User does not exist");
        return res.redirect("/");   // same page popup
    }

    bcrypt.compare(password, user.password, async function (err, result) {
        if (!result) {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/");   // same page popup
        }

        let token = generateToken(user);
        res.cookie("token", token);

        let products = await productsModel.find();
        req.flash("success", "Login successful");
        res.render("shop", {
            products,
            success: req.flash("success")
        });
    });
};


/* ================= LOGOUT ================= */

module.exports.logoutUser = function (req, res) {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
};
