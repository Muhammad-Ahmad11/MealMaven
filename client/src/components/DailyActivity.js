import React, { useEffect, useState } from 'react'
// import User from './User';
import UserNavbar from './UserNavbar';

const DailyActivity = () => {

    const [userData, setUserData] = useState({foodIntake:"", steps:""});
    const [showData, setShowData] = useState({});

    const callDailyActivity = async () => {
      try{
        const res = await fetch('/DailyActivity', {
          method:'GET',
          headers: {
            "Content-Type": "Application/json"
          },
        });
  
        const data = await res.json();
        console.log(data);
        setShowData(data);
        
        if(!res.status===200)
        {
          const error= new Error(res.error);
          throw error;
        }
  
      } catch(err) {
        console.log(err);
      }
    }
  
    useEffect(()=> {
      callDailyActivity();
    }, []);

    const handleInputs  = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUserData({ ...userData, [name]:value })
    }
    
    const DailyActivityForm = async (e) => {
        e.preventDefault();
        
        const { foodIntake, steps } = userData;

        if (!foodIntake || !steps) {
            window.alert('Please enter all fields!');
            return;
        }

        if (steps<0 || steps>100000) {
          window.alert('Invalid steps!');
          return;
        }

        const res = await fetch ('/DailyActivityPost', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"  
            },
            body: JSON.stringify({
                foodIntake, steps
            })
        });

        const data = await res.json();

        if(!data) {
            console.log("Activity not added");
        } else {
            alert("Activity Added!");
            setUserData({...userData, foodIntake:"", steps:""});
        }
    }

  return (
    <>
    <UserNavbar/>
    <div className='recipes-container'>
    <h1 className='recipes-header'>Your Daily Activities:</h1>
    
    <ul className="recipes-list">
    {showData.activity && showData.activity.length > 0 ?
    showData.activity.map((activity, index) => (
      <li className="recipe">
      <div key={index}>
        <h5>Food Intake: {activity.foodIntake}</h5>
        <h5>Steps: {activity.steps}</h5>
        <h5>Date: {activity.date}</h5>
        <hr /> 
      </div>
      </li>
    ))
    :
    <h5>No activities found.</h5>
   
  }
  
  </ul>
    <div style={{ position: 'fixed', bottom: '5rem', left: 0 ,padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h3 style={{ textAlign: 'left' }}>Add Daily Activity:</h3>
      <form method="POST" id="activityForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="big-textbox">
          Food Intake:
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          name="foodIntake"
          value={userData.foodIntake}
          onChange={handleInputs}
        />
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="small-textbox">
          Steps:
        </label>
        <input style={{ padding: '0.5rem', width: '10rem' }} type="number" id="small-textbox" name="steps" value={userData.steps} onChange={handleInputs} step='100'/>
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
          onClick={DailyActivityForm}
        >
          Add
        </button>
      </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default DailyActivity;
