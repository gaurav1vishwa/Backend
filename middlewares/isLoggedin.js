const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  try {
    // 1️⃣ token exist?
    if (!req.cookies.token) {
      req.flash("error", "You must be logged in to access this page");
      return res.redirect("/");
    }

    // 2️⃣ verify token
    let decoded = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY
    );

    // 3️⃣ find user
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      req.flash("error", "User not found, please login again");
      return res.redirect("/");
    }

    // 4️⃣ success
    req.user = user;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    req.flash("error", "Session expired, please login again");
    return res.redirect("/");
  }
};
