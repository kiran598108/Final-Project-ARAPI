const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert'], default: 'Dinner' },
  dietaryRestrictions: [{ type: String, enum: ['Vegetarian', 'Vegan', 'Gluten-Free'] }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number, min: 1, max: 5 } }],
  comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Recipe', recipeSchema);