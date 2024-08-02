import express from "express";
import bodyParser from "body-parser";
// query param user/id=7
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config(); // let run command process.env

let app=express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
viewEngine(app);
initWebRoutes(app);
let port=process.env.PORT || 6969; // if port undefined then port === 6969

app.listen(port,()=>{
    // call back
    console.log("Backend Node JS is running at " + port)
})