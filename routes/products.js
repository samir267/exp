const express=require ('express')
const router=express.Router();

const items=[
    {
    id:1,
    name:'produit 1',
    price:20
    },

    {
        id:2,
        name:'produit 2',
        price:40
    },
    {
        id:3,
        name:'produit 3',
        price:60
        },
    ] 

    //routes 
    router.get('/all', (req,res)=>{
        res.send(items)
    })
        
    
    router.get('/:id', (req,res)=>{
        const itemId=parseInt (req.params.id);
        const item=items.find((x)=> x.id===itemId);
        if(item){
        res.send(item)
        }else {
            res.status(404).send("Product no found")
        }
    })

    router.delete('/:id', (req, res) => {
        const itemId = parseInt(req.params.id);
        const item = items.find(item => item.id === itemId);
    
        if (item) {
            const data = items.filter(item => item.id !== itemId);
            res.send(data);
        } else {
            res.status(404).send("Product not found");
        }
    });
    
    module.exports=router;
