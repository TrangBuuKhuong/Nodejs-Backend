import express from "express";
import homeController from "../controllers/homeController";
let router=express.Router();
let initWebRoutes=(app)=>{

    router.get("/",(req,res)=>{
        return res.send("Hello Khang");
    });
    router.get("/hoidanit",(req,res)=>{
        return res.send("Hello hoi dan it");
    });
    router.get("/home",homeController.getHomePage);
    router.get("/about",homeController.getaboutPage);
    router.get("/crud",homeController.getCRUD);
    router.post("/post-crud",homeController.postCRUD);

return app.use("/",router);
}

module.exports=initWebRoutes;