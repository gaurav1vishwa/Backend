
const express= require('express')
 const app=express();


// kaise aap form ka data bhejte ho 

app.use(express.json()) // send the data in json 
app.use(express.urlencoded({ extended :true})) //send the data in urlencoded .
