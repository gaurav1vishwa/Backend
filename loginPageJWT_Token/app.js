const cookieParser = require('cookie-parser');
const express =require('express');
const app= express();

const path = require('path');


app.set("view engine","ejs");


app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.get('/' , function(req,res){
       res.render("index");
})

// User model
const User = require("./models/user");

// form submit
app.post("/create", async (req, res) => {
  const { username, email, password, age } = req.body;
  let createdUser=await User.create({
    username,
    email,
    password,
    age
  });
  res.send(createdUser);
});


app.listen(3000)