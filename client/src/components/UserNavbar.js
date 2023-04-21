import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const UserNavbar = () => {
  return (<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#" style={{ fontFamily: "Courier New", fontSize: "24px"}}>MealMaven</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/UserHome">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/UserDietPlan">Diet Plan</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href='/UserHome' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Recipes
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to="/SugarFreeRecipe">Sugar Free</NavLink></li>
            <li><NavLink className="dropdown-item" to="/StarchFreeRecipe">Starch Free</NavLink></li>
            <li><NavLink className="dropdown-item" to="/ProteinRecipe">Protein</NavLink></li>
            <li><NavLink className="dropdown-item" to="/DairyRecipe">Dairy</NavLink></li>
            <li><NavLink className="dropdown-item" to="/CarbFreeRecipe">Carb Free</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/DailyActivity">Daily Activity</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Premium</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/UserLogin">Log Out</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</> )
}
export default UserNavbar