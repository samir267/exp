const express=require('express');
//hajetna ken module router
const router=express.Router();

router.post("/login",(req,res)=>{
    //res.send("<h1>Hey this is the login route </h2>");
  //this return undefiend   console.log(req.body)
  //il faut ajouter body parser
    res.send(req.body);
})

router.get("/register",(req,res)=>{
    res.send("<h1>Hey this is the register route </h2>");
})


//exporter router from auth.js
module.exports=router;