const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const productsModel = require('../models/product-model');


module.exports.resisterUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).send("user already exists please login");
        }


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.send(err.message);
                }
                else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password: hash,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token)
                    res.send("user registered successfully");
                }

            });
        });


    }
    catch (err) {
        res.send(err.message);
    }
};


module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        return res.send("email or password is incorrect");
    };
    bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {

            let token = generateToken(user);
            res.cookie("token", token);
            let products = await productsModel.find();
            res.render('shop', { products, success: "" });

        }
        else {
            return res.send("email or password is incorrect");
        }

    });
};

module.exports.logoutUser = function (req, res) {
    res.clearCookie("token", "");
    res.redirect("/");
};
