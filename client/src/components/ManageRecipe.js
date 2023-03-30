import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({name:"", type:"", ingredients:"", instructions:""});
  const [editRecipeData, setEditRecipeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes6");
      setRecipes(result.data);
      setEditRecipeData(result.data);
        } catch (err)
        {
            console.log(err);
        }
    };

    fetchData();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    window.alert(`Recipe deleted!`);
    try {
      await axios.delete(`/recipes7/${recipeId}`);
      const updatedRecipes = recipes.filter((recipe) => recipe._id !== recipeId);
      setRecipes(updatedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleInputs  = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setRecipeData({ ...recipeData, [name]:value })
    }

    const handleInputs2  = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setEditRecipeData({ ...editRecipeData, [name]:value })
        }

  const ManageRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = recipeData;
    

    if (!name || !type || !ingredients || !instructions) {
        window.alert('Please enter all fields!');
        return;
    }


    

    const res = await fetch('/recipes8', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, ingredients, instructions })
    });

    const data = await res.json();

    if(!data) {
        alert("Recipe not added");
    } else {
        alert("Recipe Added!");
        setRecipeData({...recipeData, name:"", type:"", ingredients:"", instructions:""});
    }
   }

   const EditRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = editRecipeData;
    

    if (!name) {
        window.alert('Please enter name of the recipe!');
        return;
    }

    const res = await fetch(`/recipes9/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, ingredients, instructions })
      });

    const data = await res.json();

    if(!data) {
        alert("Recipe not edited");
    } else {
        alert("Recipe Edited!");
        setEditRecipeData([]);
    }
   }


  return (
    <>
<div className="recipes-container">
  <h1 className="recipes-header">Manage Recipes</h1>
  <ul className="recipes-list">
    {recipes.map((recipe) => (
      <li key={recipe._id} className="recipe">
        <h2 className="recipe-name">{recipe.name}</h2>
        <p className="recipe-type">
          <strong>Type:</strong> {recipe.type}
        </p>
        <p className="recipe-ingredients">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p className="recipe-instructions">
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
        <div className="recipe-actions">
          <button className="recipe-action-btn" onClick={() => handleDeleteRecipe(recipe._id)}>
            <FaTrashAlt />
          </button>
          {/* <button className="recipe-action-btn" onClick={() => handleEditRecipe(recipe._id)}>
            <FaPencilAlt />
          </button> */}
        </div>
      </li>
    ))}
  </ul>
</div>
<div style={{ position: 'fixed', bottom: '-1rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
<h4 style={{ textAlign: 'left' }}>Add Recipe:</h4>
      <form method="POST" id="activityForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
      <label style={{ marginBottom: '0.5rem'}} htmlFor="name-textbox">
          Name:
        </label>
        <input style={{ padding: '0.5rem', width: '10rem' }} type="text" id="name-textbox" name="name" value={recipeData.name} onChange={handleInputs} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
            Type:
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs}
            value={recipeData.type}
        >
        <option value="">Choose type:</option>
        <option value="sugar free">Sugar Free</option>
        <option value="carb free">Carb Free</option>
        <option value="protein">Protein</option>
        <option value="dairy">Dairy</option>
        <option value="starch free">Starch Free</option>
        </select>
        
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
          Ingredients:
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleInputs}/>

        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
          Instructions:
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          name="instructions"
          value={recipeData.instructions}
          onChange={handleInputs}/>

        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
          }}
          type="submit"
          onClick={ManageRecipeForm}
        >
          Add
        </button>
      </div>
      </form>
    </div>


    <div style={{ position: 'fixed', left:'68rem',bottom: '-1rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
<h4 style={{ textAlign: 'left' }}>Edit Recipe:</h4>
      <form method="POST" id="editForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
      <label style={{ marginBottom: '0.5rem'}} htmlFor="name-textbox">
          Name of recipe to edit:
        </label>
        <input style={{ padding: '0.5rem', width: '10rem' }} type="text" id="namee-textbox" name="name" value={editRecipeData.name} onChange={handleInputs2} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
            Type:
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs2}
            value={editRecipeData.type}
        >
        <option value="">Choose type:</option>
        <option value="sugar free">Sugar Free</option>
        <option value="carb free">Carb Free</option>
        <option value="protein">Protein</option>
        <option value="dairy">Dairy</option>
        <option value="starch free">Starch Free</option>
        </select>
        
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
          Ingredients:
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          name="ingredients"
          value={editRecipeData.ingredients}
          onChange={handleInputs2}/>

        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
          Instructions:
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          name="instructions"
          value={editRecipeData.instructions}
          onChange={handleInputs2}/>

        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
          }}
          type="submit"
          onClick={EditRecipeForm}
        >
          Edit
        </button>
      </div>
      </form>
    </div>
</>
  );
};

export default ManageRecipe;