const express=require('express');

const app=express();

// ab hum routes create kr sakte hai 
//kaise = jaise youtoube, google ye sb default " /"  routes me rahta hai iska matlab ye hai ki aap youtuvbe.com ya fir youtube.com/ dono se same page he khulega 


// aur hum get() se routes create kr sakte hai ;

//  this is syntex => app.get( routes, requestHandler);

// syntex of written middleware 

app.use(function(req,res,next){
    console.log("middleware chala ");
    next();
    
})
app.use(function(req,res,next){
    console.log("middleware chala ek aur bar");
    next();
    
})


app.get("/",function(req, res){
    res.send("hey you are create a routes")
})

app.get("/first",function(req, res){
    res.send("hey how are you")
})


app.get("/profile",function(req, res, next){
    // here i am putting the error handiler in this route so .
return next(new Error("something went wrong"))
})

//error handler  default code 
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



// to run the server you  must have to attach the port where your server runs 

app.listen(3000);   // 30000 is the famous port where you can so the information of your routes althoug you can select any port as you want but 3000 is the famous one for doing such so that approx all the time you will  this port numbeter

// jaruri baat => jb aap kisi server ko start kr dete hai to vo apne app restart nhi hota aapko use dubara start karna padta hai 

// aap ek package install kr sakte hai "nodemon " to ye apne app restart kr deta hai server ko apar app 
// server ke ander kuchh change karthe ho to .

// and than run with the nodemon  => nodemon and __filename;


