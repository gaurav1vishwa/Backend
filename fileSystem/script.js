// file system

const { log } = require('node:console');
const fs = require('node:fs');

// fs.writeFile("first.txt","hey aur bhai kaise ho app",function(err){

//     if(err) console.error(err);
//     else console.log("done");
    
// })

// likhe huye me kuchh jasa append karna 


// fs.appendFile("first.txt","mai achha hu aap batao aap kaise ho",function(err){
    
//     if(err) console.error(err);
//     else console.log("done");
    
// })


//rename the file and make the new one file as the same content which includes in privious file 
// fs.rename("first.txt","new_first.txt",function(err){
//     if(err) console.err(err);
//     else console.log("done");
// })


// fs.copyFile("new_first.txt","../copy_folder/replace.txt",function(err){

//     // ./ means we are going to create a file inside the folder which is immidate fist and ../ means that secod one

//     // here err.mesage show whhat's error ;
//     if(err) console.error(err.message);
//     else console.log("done");
    
// })

// this goes to delete the file name which is present in the particular name file ..    
// fs.unlink("new_first.txt",function(err){
//     if(err) console.error(err.data);
//     else console.log("done");
    
// })



// fs.writeFile("fist.txt","hello kaise ho app log bhi ",function(err){
//     if(err) console.error(err);
//     else console.log("something went wrong")
// })

// to chekc the file/folder is exist or not 

fs.existsSync("first.txt"),function(err){
if(error) console.log(err)
else console.log("file is not present");

}
