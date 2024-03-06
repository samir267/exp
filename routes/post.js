const express=require('express')
const router=express.Router()
const post=require('../models/post')


router.post('/post/ajouter',async(req,res)=>{
    try{
        const newPost=new post({titre:req.body.titre,description:req.body.description});
        await newPost.save();
        res.status(201).send("new post added");
    }catch(error){
        res.status(400).send(error.message);
    }
})


router.get('/post/getAll',async(req,res)=>{
    try{
        const allPosts=await post.find();
        res.status(201).json(allPosts)
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.get('/post/getById/:id',async(req,res)=>{
    try{
        const id =req.params.id;
        console.log(id);

        const selectedPost= await post.findById(id);
        if(selectedPost){
        res.status(201).json(selectedPost)
        }else{
            res.status(404).send("not  found")
        }
    }catch(error){
        res.status(400).send(error.message)
    }
})


router.delete('/post/deleteById/:id',async(req,res)=>{

    const id=req.params.id;
    console.log(id)
    const Getpost=await post.findById(id);
    if(Getpost){
        await Getpost.deleteOne();
        res.status(201).send("success delete")
    }
})


module.exports=router