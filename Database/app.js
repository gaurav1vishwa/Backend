const express= require('express');
const app= express();

const userModel= require('../Database_CRUD/usermodel');

app.get("/", function(req, res){
    console.log("server running in 3000 port")
    res.send("hey everyone !")
})

app.get("/create", async (req, res)=> {
 const createduser = await userModel.create({
    name :"gaurav",
    email: "shnivishwakarma1234@gmail.com",
    username: "shni@123"
   })
res.send(createduser);
})

app.get("/create", async (req, res)=> {
 const createduser = await userModel.create({
    name :"saurav",
    email: "sauravvishwakarma1234@gmail.com",
    username: "saurav@123"
   })
res.send(createduser);
})

app.get("/create", async (req, res)=> {
 const createduser = await userModel.create({
    name :"rahul",
    email: "rahulvishwakarma1234@gmail.com",
    username: "rahul@123"
   })
res.send(createduser);
})

app.get("/update", async (req, res) => {
 const updatedUser = await userModel.findOneAndUpdate(
    { username: "shni@123" },
    { email: "updatedemail@gmail.com" },
    { new: true}
 );
 res.send(updatedUser);
});

app.get("/read", async (req, res) => {
    // find all the uesrs 

    const users = await userModel.find();

    //find the specific user
//   const users = await userModel.findOne({ username: "shni@123" });

  res.send(users);
});

app.get("/delete", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({
    username: "shni@123"
  });

  res.send(deletedUser);
});





app.listen(3000);
