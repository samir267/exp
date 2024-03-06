const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    titre:{type:String,required:true},
    description:{type:String,required:true}}
    );

const post=mongoose.model('post',postSchema);

module.exports=post