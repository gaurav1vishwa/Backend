const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const path = require('path');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', function (req, res) {
  res.render("index");
})

// User model
const User = require("./models/user");

// form submit
app.post("/create", async (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {

      let createdUser = await User.create({
        username,
        email,
        password: hash, //  hashed password
        age
      });
     
 let token= jwt.sign({email},"secret")
 
 res.cookie("token",token)
//  console.log(token);


      res.send(createdUser);
    });
    
 
});
  });

  app.get("/login", function(req, res){
    res.render("login");
  })

  app.post("/login", async function(req,res){
    let user= await User.findOne({email:req.body.email})
    if(!user){
      return res.send("something went wrong");
    }
    
    bcrypt.compare(req.body.password, user.password, function(err, result){
      if(result)
        {
     let token= jwt.sign({email: user.email},"secret")
      res.cookie("token",token)
      console.log(token);
          res.send("yes you can login ")
        } 
      else  res.send("something went wrong") 
    });
  })

    app.get("/logout", function(req, res){
    res.cookie("token","");
    res.redirect("/");
  })


app.listen(3000)