import React, { useState, useEffect } from "react";
import axios from "axios";
// import UserNavbar from "./UserNavbar";
import User from "./User";

const ProteinRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes3?type=protein");
      setRecipes(result.data);
        } catch (err)
        {
            console.log(err);
        }
    };

    fetchData();
  }, []);

  return (
    <>
    {/* <UserNavbar/> */}
    <User/>
    <div className="recipes-container">
      <h1 className="recipes-header">Protein Recipes</h1>
      <ul className="recipes-list">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe">
            <h2 className="recipe-name">{recipe.name}</h2>
            <p className="recipe-ingredients">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="recipe-instructions">
              <strong>Instructions:</strong>{" "}
              {recipe.instructions}
            </p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ProteinRecipe;
