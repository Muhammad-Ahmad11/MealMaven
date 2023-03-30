import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const UserNavbar = () => {
  return (<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#" style={{ fontFamily: "Peace Sans, sans-serif", fontSize: "24px"}}>MealMaven</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/UserHome">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Diet Plan</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Recipe">Recipes</NavLink>
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