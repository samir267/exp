const express = require('express');
const route = express.Router();
const Voiture = require('../models/voiture.js'); // Assurez-vous que le chemin est correct

// Ajouter une voiture
route.post('/api/voitures', async (req, res) => {
  const { id, name } = req.body;
  const newVoiture = new Voiture({ id, name });
  await newVoiture.save();
  res.json(newVoiture);
});

// Lister toutes les voitures
route.get('/api/voitures', async (req, res) => {
  const voitures = await Voiture.find();
  res.json(voitures);
});

// Lister une voiture par ID
route.get('/api/voitures/:id', async (req, res) => {
  const voiture = await Voiture.findOne({ id: req.params.id });
  if (!voiture) {
    return res.status(404).json({ message: 'Voiture non trouvée' });
  }
  res.json(voiture);
});

// Modifier une voiture par ID
route.put('/api/voitures/:id', async (req, res) => {
  const { name } = req.body;
  const voiture = await Voiture.findOneAndUpdate(
    { id: req.params.id },
    { $set: { name } },
    { new: true }
  );
  if (!voiture) {
    return res.status(404).json({ message: 'Voiture non trouvée' });
  }
  res.json(voiture);
});

// Supprimer une voiture par ID
route.delete('/api/voitures/:id', async (req, res) => {
  const voiture = await Voiture.findOne({ id: req.params.id });
  if (!voiture) {
    return res.status(404).json({ message: 'Voiture non trouvée' });
  }
  await voiture.deleteOne();
  res.json({ message: 'Voiture supprimée avec succès' });
});

module.exports = route;
