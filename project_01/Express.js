const express= require('express')
const app= express();
const path = require("path");

// parsar
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// all the static file are here 
app.use(express.static(path.join(__dirname, 'public'))); // path.join(__dirname, 'public') iski jagah pura path aayaga 


app.set("view engine", "ejs");
//“All my template files live inside the views folder.”
app.set("views", path.join(__dirname, "views"));


app.get("/", function(req, res){
    // res.send("sb kuchh sahi cha rah hai ")
    res.render("index");
})

// creating the dynamic routing 
// when i use : before the routes than routes is dynamic 
app.get("/profile/:username",function(req,res){
    // res.send("sab sahi hai")
    res.send(`welcome, ${req.params.username}`);
})

app.get("/profile/:username/:age",function(req,res){
   

    res.send(`welcome, ${req.params.username},${req.params.age} `);
})

app.listen(3000,function(){
console.log("its running.....");

});
