const express=require('express');
const { fstat } = require('fs');
const app= express();
const path =require('path');

const fs=require('fs');
const { log } = require('console');



// setting the view engine 
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({extended:true}))

// setup to use the middle wear
app.use(express.static(path.join(__dirname , "public")));



app.get('/', function(req, res){
    // read the directory and file
    fs.readdir(`./files`,function(err, files){
 res.render("index",{files:files});
  
    })
})

   app.get('/edit/:filename', function(req, res){
 res.render('edit', { filename: req.params.filename });

    })

    app.post('/edit',function(req, res){
        fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,function(err){
            res.redirect("/");
        });
    })

 
  


    //creating a dynamic route
    app.get('/file/:filename', function(req, res){
    fs.readFile( `./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render('show',{filename: req.params.filename, filedata: filedata });
        
    })
    })


app.post('/create', function(req, res){
fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details, function(err){
    res.redirect("/");
});
   
    })
 
 

    

app.listen(3000);



// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');

// // view engine
// app.set("view engine", "ejs");

// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// // HOME ROUTE
// app.get('/', function (req, res) {
//     fs.readdir('./files', function (err, files) {
//         res.render("index", { files });
//     });
// });

// // EDIT ROUTE ✅
// app.get('/edit/:filename', function (req, res) {
//     res.render('edit', { filename: req.params.filename });
// });

// // SHOW FILE ROUTE
// app.get('/file/:filename', function (req, res) {
//     fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
//         res.render('show', {
//             filename: req.params.filename,
//             filedata
//         });
//     });
// });

// // CREATE FILE ROUTE
// app.post('/create', function (req, res) {
//     fs.writeFile(
//         `./files/${req.body.title}.txt`,
//         req.body.details,
//         function (err) {
//             res.redirect("/");
//         }
//     );
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });
