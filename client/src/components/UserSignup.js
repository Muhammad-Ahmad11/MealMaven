import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import '../App.css';

const UserSignup = () => {
const history = useNavigate();
const [user, setUser] = useState({
name: '',
email: '',
phone: '',
password: '',
cpassword: '',
});

const handleInputs = (e) => {
const name = e.target.name;
const value = e.target.value;
setUser({ ...user, [name]: value });
};

const PostData = async (e) => {
e.preventDefault();

if (!user.email || !user.password || !user.cpassword || !user.phone || !user.name) {
  window.alert('Please fill all the fields!');
  return;
}

if (user.phone.length < 11 || user.phone.length > 14) {
  window.alert('Invalid Phone number length!');
  return;
}

if (user.name.length < 3) {
  window.alert('Name must have at least 3 characters!');
  return;
}

if (user.password.length < 8) {
  window.alert('Password must have at least 8 characters!');
  return;
}

if (!user.email.includes('@gmail.com')) {
  window.alert('Invalid email address!');
  return;
}

if (!/[A-Z]/.test(user.password)) {
  window.alert('Password must have at least 1 uppercase letter!');
  return;
}

if (!/\d/.test(user.password)) {
  window.alert('Password must have at least 1 numerical digit!');
  return;
}

const { name, email, phone, password, cpassword } = user;
const res = await fetch('/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    phone,
    password,
    cpassword,
  }),
});

const data = await res.json();

if (res.status === 422 || !data) {
  window.alert('Registration not successful');
  return;
} else {
  window.alert('Registration Successful');
  history('/UserLogin');
}

};

return (
  <>
  <Navbar />
  <section className='login-section'>
  <div className='container mt-5'>
  <div className='login-content row'>
  <div className='col-md-6'>
  <div className='login-form'>
  <h2 className='form-title'>User Sign Up</h2>
  <form className='register-form' id='register-form' onSubmit={PostData}>
  <div className='form-group'>
  <input
                   type='text'
                   name='name'
                   id='name'
                   autoComplete='off'
                   value={user.name}
                   onChange={handleInputs}
                   className='form-input'
                   required
                   placeholder='Name'
                 />
  </div>
  <div className='form-group'>
  <input
                   type='email'
                   name='email'
                   id='email'
                   autoComplete='off'
                   value={user.email}
                   onChange={handleInputs}
                   className='form-input'
                   required
                   placeholder='Email'
                 />
  </div>
  <div className='form-group'>
  <input
                   type='tel'
                   name='phone'
                   id='phone'
                   autoComplete='off'
                   value={user.phone}
                   onChange={handleInputs}
                   className='form-input'
                   required
                   placeholder='Phone'
                 />
  </div>
  <div className='form-group'>
  <input
                   type='password'
                   name='password'
                   id='password'
                   autoComplete='off'
                   value={user.password}
                   onChange={handleInputs}
                   className='form-input'
                   required
                   placeholder='Password'
                 />
  </div>
  <div className='form-group'>
  <input
                   type='password'
                   name='cpassword'
                   id='cpassword'
                   autoComplete='off'
                   value={user.cpassword}
                   onChange={handleInputs}
                   className='form-input'
                   required
                   placeholder='Confirm Password'
                 />
  </div>
  <div className='form-group form-button'>
  <button type='submit' className='form-submit'>
  Sign up
  </button>
  </div>
  <span>Already have an account? <NavLink to="/UserLogin">Login</NavLink></span>
  </form>
  </div>
  </div>
  </div>
  </div>
  </section>
  </>
  );
  };
  
  export default UserSignup;