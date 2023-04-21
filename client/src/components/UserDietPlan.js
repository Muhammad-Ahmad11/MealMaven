import axios from 'axios';
import React, { useState, useEffect  } from 'react';
import UserNavbar from './UserNavbar';
import Footer from './Footer';

const UserDietPlan = () => {

  const [formData, setFormData] = useState({
    email: '',
    height: '',
    weight: '',
    age: '',
    prefer: '',
    avoid: '',
    goal: '',
    complete: false,
    plan: ''
  });

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetch('/UserHome')
      .then(res => res.json())
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { age, height, weight } = formData;

    if (age<3 || age>120){
        window.alert('Invalid BMI values!');
        return;
    }
    if (height<50 || height>250) {
        window.alert('Invalid BMI values!');
        return;
    }
    if (weight<10 || weight>180) {
        window.alert('Invalid BMI values!');
        return;
    }
    try {
      const res = await axios.post('/requestdiet', formData);

      if(!res) {
          alert("Error. Request not sent!");
      }
      else {
          alert("Diet Plan Request sent successfully!");
      }
      console.log(res.data);
      setFormData({
        email: '',
        height: '',
        weight: '',
        age: '',
        prefer: '',
        avoid: '',
        goal: '',
        complete: false,
        plan: ''
      });
    } catch (err) {
      console.error(err);
      alert("You have already requested a diet plan request!");
    }
  };

  const [plan, setPlan] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/dietplann/${userEmail}`);
        setPlan(res.data.plan);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, [userEmail]);

  const [fullPlan, setFullPlan] = useState({name:"", type:"", duration:"", details:""});
  useEffect(() => {
    const fetchFullPlan = async () => {
      try {
        console.log(plan);
        const res = await axios.get(`/dietplanfull/${plan}`);
        setFullPlan(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFullPlan();
  }, [plan]);
    
  return (
    <>
    <UserNavbar/>
    <div className='home-page'>
    <div className='container'>
    
  <div className='left-section'>
  <h2>Request Diet Plan</h2>
    
      <div className='login-section'>
      <div className="login-content row">
      <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Height (in cm):</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} required />
        </div>
        <div>
          <label>Weight (in kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Preference:</label>
          <textarea name="prefer" value={formData.prefer} onChange={handleChange} />
        </div>
        <div>
          <label>Avoid:</label>
          <textarea name="avoid" value={formData.avoid} onChange={handleChange} />
        </div>
        <div>
          <label>Goal:</label>
          <select name="goal" value={formData.goal} onChange={handleChange} required>
            <option value="">Choose:</option>
            <option value="Weight decrease">Weight decrease</option>
            <option value="Weight increase">Weight increase</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  </div>
  </div>
  
  {/* <div className='right-section'>
    <h2>View Diet Plan received:</h2>
    <div>
          
          <br></br>
          <h4>{fullPlan.name}</h4>
          <h4>{fullPlan.type}</h4>
          <h4>{fullPlan.duration}</h4>
          <h4>{fullPlan.details}</h4>
        </div>
  </div> */}
  <div className='right-section'>
  <h2>View Diet Plan received:</h2>
  {plan==='' && (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h3>No diet plan yet!</h3>
      </div>
  )}
  {fullPlan.name!=="" && (
    <div>
      <br></br>
      <br></br>
      <label>Name:</label>
      <h4>{fullPlan.name}</h4>
      <br></br>
      <label>Type:</label>
      <h4>{fullPlan.type}</h4>
      <br></br>
      <label>Duration:</label>
      <h4>{fullPlan.duration}</h4>
      <br></br>
      <label>Details:</label>
      <h4>{fullPlan.details}</h4>
    </div>
  )}
</div>
</div>
</div>
<Footer/>
    </>
  );
};

export default UserDietPlan;

// import axios from 'axios';
// import React, { useState, useEffect  } from 'react';
// import UserNavbar from './UserNavbar';
// import Footer from './Footer';

// const UserDietPlan = () => {

//   const [userEmail, setUserEmail] = useState('');

//   const [formData, setFormData] = useState({
//     email: JSON.stringify({userEmail}),
//     height: '',
//     weight: '',
//     age: '',
//     prefer: '',
//     avoid: '',
//     goal: '',
//     complete: false,
//     plan: ''
//   });

//   useEffect(() => {
//     fetch('/UserHome')
//       .then(res => res.json())
//       .then(data => {
//         setUserEmail(data.email);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { age, height, weight } = formData;

//     if (age<3 || age>120){
//         window.alert('Invalid BMI values!');
//         return;
//     }
//     if (height<50 || height>250) {
//         window.alert('Invalid BMI values!');
//         return;
//     }
//     if (weight<10 || weight>180) {
//         window.alert('Invalid BMI values!');
//         return;
//     }
//     try {
//       const res = await axios.post('/requestdiet', formData);

//       if(!res) {
//           alert("Error. Request not sent!");
//       }
//       else {
//           alert("Diet Plan Request sent successfully!");
//       }
//       console.log(res.data);
//       setFormData({
//         email: JSON.stringify({userEmail}),
//         height: '',
//         weight: '',
//         age: '',
//         prefer: '',
//         avoid: '',
//         goal: '',
//         complete: false,
//         plan: ''
//       });
//     } catch (err) {
//       console.error(err);
//       alert("You have already requested a diet plan request!");
//     }
//   };

//   const [plan, setPlan] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     const fetchPlan = async () => {
//       try {
//         const res = await axios.get(`/dietplann/${userEmail}`);
//         setPlan(res.data.plan);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPlan();
//   }, [userEmail]);

//   const [fullPlan, setFullPlan] = useState({name:"", type:"", duration:"", details:""});
//   useEffect(() => {
//     const fetchFullPlan = async () => {
//       try {
//         console.log(plan);
//         const res = await axios.get(`/dietplanfull/${plan}`);
//         setFullPlan(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchFullPlan();
//   }, [plan]);
    
//   return (
//     <>
//     <UserNavbar/>
//     <div className='container'>
    
//   <div className='left-section'>
//   <h2>Request a diet plan</h2>
//     <div className='grey-page'>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           {/* <input type="email" name="email" value={userEmail} onChange={handleChange} required /> */}
//           {/* <input type="email" name="email" value={formData.email} onChange={handleChange} required /> */}
//           <p>{userEmail}</p>
//         </div>
//         <div>
//           <label>Height (in cm):</label>
//           <input type="number" name="height" value={formData.height} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Weight (in kg):</label>
//           <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Preference:</label>
//           <textarea name="prefer" value={formData.prefer} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Avoid:</label>
//           <textarea name="avoid" value={formData.avoid} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Goal:</label>
//           <select name="goal" value={formData.goal} onChange={handleChange} required>
//             <option value="">Choose:</option>
//             <option value="Weight decrease">Weight decrease</option>
//             <option value="Weight increase">Weight increase</option>
//           </select>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   </div>
//   {/* <div className='right-section'>
//     <h2>View Diet Plan received:</h2>
//     <div>
          
//           <br></br>
//           <h4>{fullPlan.name}</h4>
//           <h4>{fullPlan.type}</h4>
//           <h4>{fullPlan.duration}</h4>
//           <h4>{fullPlan.details}</h4>
//         </div>
//   </div> */}
//   <div className='right-section'>
//   <h2>View Diet Plan received:</h2>
//   {plan==='' && (
//     <div>
//       <br></br>
//       <br></br>
//       <br></br>
//       <h3>No diet plan yet!</h3>
//       </div>
//   )}
//   {fullPlan.name!=="" && (
//     <div>
//       <br></br>
//       <br></br>
//       <label>Name:</label>
//       <h4>{fullPlan.name}</h4>
//       <br></br>
//       <label>Type:</label>
//       <h4>{fullPlan.type}</h4>
//       <br></br>
//       <label>Duration:</label>
//       <h4>{fullPlan.duration}</h4>
//       <br></br>
//       <label>Details:</label>
//       <h4>{fullPlan.details}</h4>
//     </div>
//   )}
// </div>

// </div>
// <Footer/>

//     </>
//   );
// };

// export default UserDietPlan;