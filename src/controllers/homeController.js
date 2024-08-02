

let getHomePage=(req,res)=>{
    return res.render("homepage.ejs");

}
let getaboutPage=(req,res)=>{
    return res.render("about.ejs");
}
module.exports={
    getHomePage: getHomePage,
    getaboutPage: getaboutPage
}