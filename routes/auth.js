const express=require('express');
const jwt =require('jsonwebtoken')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
//hajetna ken modul e router
const router=express.Router();

// router.post("/login",async(req,res)=>{
//     try{
//       const UserLoaded=await User.findOne({username :req.body.username});
//       if(UserLoaded)
//       {
//         const pass=await bcrypt.compare(req.body.password,UserLoaded.password)
//         if(pass){
//         // const token=jwt.sign(_id:user._id).process.env.JWT
//         res.status(201).send("login succesfully ! ")}
//       }
//     }catch(error){
//       res.status(400).send(error.message);
//     }
// })




router.post("/login", async (req, res) => {
    try {
        const userLoaded = await User.findOne({ username: req.body.username });

        if (userLoaded) {
            const isPasswordValid = await bcrypt.compare(req.body.password, userLoaded.password);

            if (isPasswordValid) {
                const token = jwt.sign({ _id: userLoaded._id }, process.env.JWT_SECRET);
                res.status(201).json({ token, message: "Login successful!" });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json("errue"+{ message: error.message });
    }
});






router.post("/register",async(req,res)=>{
    try{
      const {username,password}=req.body;
      const user=new User({username,password});
      await user.save();
      res.status(201).send("user registered successfully");
    }catch(error){
      res.status(400).send(error.message);
    }
  })


//exporter router from auth.js
module.exports=router;