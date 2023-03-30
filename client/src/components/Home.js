import React from 'react'
import food from '../images/Home.jpg'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
        {/* <div className="home-page">
            <div className="col-md-4">
                <p className ="pt-5">Welcome</p>
                <h1>We are the MealMaven</h1>
            </div>
        </div> */}
        <Navbar/>
        <div className="home-page">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4">We are the MealMaven</h1>
            <p className="lead mb-5">Find the perfect meal for any occasion</p>
          </div>
          <div className="col-md-6">
          <img
              src={food}
              alt="Delicious Food"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Home