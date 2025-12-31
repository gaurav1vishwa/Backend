const cookieParser = require('cookie-parser');
const express= require('express');
const app=express();

const bcrypt= require('bcrypt');

// jwt 
const jwt = require('jsonwebtoken');
 

// use the cookieparser

app.use(cookieParser())




app.get('/',function(req, res){
   // now i am going to set the cookies
    res.cookie("name","gauravkumar")
    res.send("hellow everyone");

  
})
app.get('/read',function(req, res){
   // and now i am going to read the cookies 
    console.log(req.cookies);
    
    res.send("read this page");
 
})



app.get('/hash',function(req, res){

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("garuav1234", salt, function(err, hash) {
  
      console.log(hash);  
    });
});
});

const storedPassword="$2b$10$vxNxBUlOAvQso9npojMEoeOWNK.5ISPG11BT7OLmzVTLB3ElYqGWK"
const newPassoword ="garuav1234";

bcrypt.compare(newPassoword, storedPassword, function(err, result) {
 if(result){
    console.log("password match ho gaya hai user authenticate hai ");
    
 }
 else {
    console.log("password match nhi huaa you are not authenticate user  ");
    
 }
});

// set the jwt 
app.get('/jwt',function(req, res){
 let token= jwt.sign({email: "shnivishw@gmail.com"},"secret")
 
 res.cookie("token",token)
 console.log(token);
 res.send("done")
})

app.get('/readjwt',function(req, res){
   let data= jwt.verify(req.cookies.token,"secret");
   console.log(data);
   
 
})


app.listen(3000);

console.log("your port is running in 3000");