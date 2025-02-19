import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('https://final-project-arapi.onrender.com/api/recipes');
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;