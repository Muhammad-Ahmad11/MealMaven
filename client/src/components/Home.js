import React from 'react'
import food from '../images/Home.jpg'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4">We are the MealMaven</h1>
              <p className="lead mb-5">Find the perfect meal for any occasion</p>
            </div>
            <div className="col-md-6">
              <img src={food} alt="Delicious Food" />
            </div>
          </div>
        </div>
      </div>
      <ul className="wrapper">
        <NavLink to="/Admin">
        <li className="icon admin">
        <span className="tooltip">Admin</span>
        <span><i className="fab fa-admin-f"></i></span>
        </li>
        </NavLink>
        <NavLink to="/UserSignup">
        <li className="icon user">
        <span className="tooltip">User</span>
        <span><i className="fab fa-user"></i></span>
        </li>
        </NavLink>
      </ul>

    </>
  )
}

export default Home
