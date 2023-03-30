import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
// import UserNavbar from './UserNavbar';
import User from './User';

const UserHome = () => {

  const history = useNavigate();
  const [userData, setUserData] = useState({});

  const callUserHome = async () => {
    try{
      const res = await fetch('/UserHome', {
        method:'GET',
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json"
        },
        credentials: "include" 
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status===200)
      {
        const error= new Error(res.error);
        throw error;
      }

    } catch(err) {
      console.log(err);
      history("/UserLogin");
    }
  }

  useEffect(()=> {
    callUserHome();
  });

  return (
    <>
    {/* <UserNavbar/> */}
    <User/>
    {/* <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 'bold',
      fontSize: '24px',
      color: 'black'
    }}> */}
    {/* <div className='home-page'> */}
      {/* <h4>Welcome</h4>
      <h1>{userData.name}</h1>
      <h3>Happy to see you back</h3> */}
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="col-md-6 text-center">
    <h1 className="lead mb-7">Welcome</h1>
    <h1 className="display-4">{userData.name}</h1>
    <h1 className="lead mb-5">Happy to see you back</h1>
  </div>
</div>
{/* </div> */}



       {/* <div className='UserHome'>
        <form method='GET'>
        <a href="/">
          <button 
            onClick={(event) => { event.preventDefault(); window.location.href = '/'; }} 
            style={{ 
            fontSize: '24px', 
            padding: '16px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' ,
            margin: '8px'
          }}>{userData.name}</button>
        </a>
        <a href="/">
          <button
            onClick={(event) => { event.preventDefault(); window.location.href = '/'; }} 
            style={{ 
            fontSize: '24px', 
            padding: '16px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '8px'
          }}>Request Diet Plan</button>
        </a>
        <a href="/">
          <button
            onClick={(event) => { event.preventDefault(); window.location.href = '/'; }} 
            style={{ 
            fontSize: '24px', 
            padding: '16px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '8px'
          }}>View Recipes</button>
        </a>
        <a href="/DailyActivity">
          <button 
            onClick={(event) => { event.preventDefault(); window.location.href = '/DailyActivity'; }} 
            style={{ 
            fontSize: '24px', 
            padding: '16px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '8px' 
          }}>Daily Activity</button>
        </a>
        <a href="/">
          <button 
            onClick={(event) => { event.preventDefault(); window.location.href = '/'; }} 
            style={{ 
            fontSize: '24px', 
            padding: '16px', 
            backgroundColor: '#0077cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            margin: '8px'
          }}>Premium Feature</button>
        </a>
      </form>
    </div> */}
    {/* </div> */}
    </>
  )
}
export default UserHome