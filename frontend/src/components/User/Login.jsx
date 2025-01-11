import React, { useState, useContext, useEffect } from 'react';
import Title from '../Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';
import './Auth.css';
import siteContext from '../../context/Site Context/SiteContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const {userStateHandler, userState} = useContext(siteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try
    {
      const userData = {email, password};
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/loginuser`,userData,{
        headers : {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      toast.success(response.data.message);
      userStateHandler();
      // go back to the stack back page
      navigate(-1);
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
  };


  return (
    <div className="container-fluid authContainer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12">
            <p><NavLink to="/" className='linkBtn'><i className="fa-solid fa-house"></i> Home <i className="fa-solid fa-angle-right"></i></NavLink> Login</p>
          </div>

          <div className="col-4">
            <form action="" onSubmit={submitHandler}>
              <Title title="Login" />
              <div className="mb-3 mt-4">
                <label htmlFor="">Email</label>
                <input type="email" className='inputField' required onChange={e => setEmail(e.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <label htmlFor="">password</label>
                <input type="password" className='inputField' required onChange={e => setPassword(e.target.value)} value={password} />
              </div>
              <div className="mb-3">
                <button type='submit' className='lgBtn'>Login</button>
              </div>
              <p>Create new account. <NavLink className="linkBtn" to="/user/signup">Signup</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;