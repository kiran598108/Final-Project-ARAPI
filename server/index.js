const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./middleware/auth'));
app.use('/api/recipes', require('./routes/recipes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});