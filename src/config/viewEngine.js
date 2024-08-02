import express from "express";
let viewEngine=(app)=>{
app.use(express.static("./src/public")); // let show for project how to know get static file
app.set("view engine","ejs");//jsp, blade
app.set("views","./src/views");

}
module.exports=viewEngine;