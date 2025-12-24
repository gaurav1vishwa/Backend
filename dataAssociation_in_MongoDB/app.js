const express= require('express');

const userModel= require("./models/user")
const postModel= require("./models/post")

const app= express();

app.get('/', function(req, res){
    res.send('hey every one how are you');
})

app.get("/create", async function(req, res){
   const user = await userModel.create({
        username: "gaurav",
        age :21,
        email: "shnivishwkarma1234@gmail.com"
    });
    res.send(user);
    
})

app.get("/post/create", async function(req, res){
    const post= await  postModel.create({
        postdata : "hello how are you ",
        user :  "694c035f16fa031e5a5b9555" 
    })

    let user = await userModel.findOne({ _id :  "694c035f16fa031e5a5b9555"});
    user.posts.push(post._id);
    await user. save();
    res.send({post, user});
    

})

app.listen(3000);