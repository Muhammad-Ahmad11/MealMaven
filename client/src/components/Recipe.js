import React from 'react';
import { Link } from 'react-router-dom'
import User from './User';
// import UserNavbar from './UserNavbar'

const Recipe = () => {
  return (
    <>
      {/* <UserNavbar /> */}
      <User/>
        
      <h2 className="recipes-header">Categories</h2>
      <h3>

        <div className="button-container">
          <Link to="/SugarFreeRecipe">
            <button>Sugar Free</button>
          </Link>
          <Link to="/CarbFreeRecipe">
            <button>Carb Free</button>
          </Link>
          <Link to="/ProteinRecipe">
            <button>Protein</button>
          </Link>
          <Link to="/DairyRecipe">
            <button>Dairy</button>
          </Link>
          <Link to="/StarchFreeRecipe">
            <button>Starch Free</button>
          </Link>
        </div>
      {/* </h2> */}
      </h3>
    </>
  );
};

export default Recipe;
