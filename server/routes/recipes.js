const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Create a recipe
router.post('/', auth, async (req, res) => {
  const recipe = new Recipe({ ...req.body, user: req.user.userId });
  try {
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
    res.json(recipe);
  } catch (err) {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// Save a recipe to user's collection
router.post('/:id/save', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.savedRecipes.push(req.params.id);
    await user.save();
    res.json({ message: 'Recipe saved successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;