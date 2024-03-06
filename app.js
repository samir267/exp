const express= require('express');
const auth =require("./routes/auth.js")
const post=require("./routes/post.js")
const productRoute=require("./routes/products.js")
const bodyParser=require("body-parser")
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const MONGODB_URI=process.env.MONGODB_URI
const PORT=process.env.PORT || 5000

const voiture=require('./routes/voiture.js')

//creation of the  server instance   
const app=express()

//pour forcer la partie body ml req c'est middleware pour focer body bch yodher
app.use(bodyParser.json());

app.get('/products',(req,res)=>{
    res.send({name:"product 1",price:100})
})

//on utliser fl formulaire  de l'objet req pour acceder aux données envoyées par le client
//mais des donnees matnajmch taadihom kima password 
// haja calculable
//http:localhost:4000/user/?name=karima&password=1234
app.get("/user", (req, res) => {
    let name = req.query.name;
    let password=req.query.password;
    res.send({name:name,password:password})
})
//rajaali file index.html
//direname shortlist pour resumer ou est tu path de la file dans le projet === ../../
app.get('/template',(req,res)=>{
    res.sendFile(__dirname+ '/index.html');
})


//http:localhost:4000/post/karima/1234
// search 
app.get("/post/:name/:password", (req, res) => {
    let name = req.params.name;
    let password=req.params.password;
    res.send({name:name,password:password})
})

app.get('/redirect',(req,res)=>{
    res.redirect("/products")
})
//utliser les routes dans auth.js 
app.use("/auth",auth);

app.use("/product",productRoute);

app.use("/voiture",voiture)

app.use("/posts",post)

//racine route donc lazem lokhrin kbalha tnajem tssir error ki tebda plusieurs get
app.get('/',(req,res)=>{
    res.send("Welcome to our home route")
})

//mongoose

mongoose.connect(MONGODB_URI).then(()=>{

// creation of the server instance 
app.listen(PORT,()=>{
    console.log("Server is running on port 9000");
})
}).catch(err=>{
    console.log(err);
})