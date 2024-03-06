const mongoose=require('mongoose');
const { use } = require('../routes/auth');
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:String
})

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,10)
    }
    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User