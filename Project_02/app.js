const express= require ('express');
const { mongo } = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const userModel= require("./models/user")
const postModel= require("./models/post")


const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('./models/post');
const crypto=require('crypto')
const upload = require('./config/multerconfig');


app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());




app.get('/',function(req,res){
 res.render("index");
})

app.get('/profile/upload',function(req,res){
 res.render("profileupload");
})

app.post('/upload',isLoggedIn, upload.single("image") ,async function(req,res){
 let user= await userModel.findOne({email:req.user.email});
  user.profilepic= req.file.filename;
 await user.save();
  res.redirect("/profile");

})


app.get('/profile', isLoggedIn , async function(req,res){
   let user= await userModel.findOne({email: req.user.email}).populate("posts");
  
   res.render("profile",{user});
})

app.get('/like/:id', isLoggedIn , async function(req,res){
   let post= await postModel.findOne({_id: req.params.id}).populate("user");

if(post.likes.indexOf(req.user.userid)=== -1){
    post.likes.push(req.user.userid)
}
else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
}

  await post.save();
   res.redirect("/profile");
})

app.get('/edit/:id', isLoggedIn , async function(req,res){
   let post= await postModel.findOne({_id: req.params.id}).populate("user");
res.render('edit' , { post });
})

app.post('/update/:id', isLoggedIn , async function(req,res){
   let post= await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content})
res.redirect("/profile");
})

app.post('/post', isLoggedIn , async function(req,res){
  let user= await userModel.findOne({email: req.user.email});
 let post = await postModel.create({
    user: user._id,
    content : req.body.content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile")
})

app.post("/resister", async function(req, res){
    let {email ,password, username, name, age} =req.body;

    let user= await userModel.findOne({email});
    if(user) {
        return res.status(500).send("User already Registerd");
    } 
    bcrypt.genSalt(10,  (err, salt)=>{
        bcrypt.hash(password, salt, async (err ,hash)=>{
            let user= await userModel.create({
            username,
            email,
            age,
            name,
            password:hash
            })
         let token=  jwt.sign({email:email, userid: user._id}, "secret");
         res.cookie("token",token)
         res.send("user resisterd successfully ");
        })
    })
})

app.get('/login',function(req,res){
 res.render("login");
})
0
app.post('/login', async function(req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  bcrypt.compare(password, user.password, function(err, result) {
    if (err) return res.status(500).send("Error comparing password");

    if (result) {
      let token = jwt.sign({ email: user.email, userid: user._id }, "secret");
      res.cookie("token", token);
      // if the email and password is right then rediret to the profile page 
      res.redirect("/profile");
    } else {
      res.status(401).send("Wrong password");
    }
  });
});

    app.get("/logout", function(req, res){
    res.cookie("token","");
    res.redirect("/login");
})

function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        return res.redirect("/login");
    } else {
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }
}

app.listen(3000);