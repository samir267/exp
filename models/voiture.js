const mongoose = require('mongoose');

const voitureSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true }  
  });



//   voitureSchema.pre('save',async function(next){
//     const user=this;
//     next();
// })



  const Voiture = mongoose.model('Voiture', voitureSchema);
module.exports=Voiture