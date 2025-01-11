import React, { useContext, useState } from 'react';
import Title from '../../Title/Title';
import { NavLink } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import siteContext from '../../../context/Site Context/SiteContext';

function Login() {
  const {adminStateHandler} = useContext(siteContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try
    {
      const adminData = {email, password};
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/loginadmin`,adminData,{
        headers : {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      toast.success(response.data.message);
      adminStateHandler();
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
  }

  return (
    <div className="container-fluid authContainer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-lg-4 col-md-6 col-sm-12">
            <form onSubmit={submitHandler}>
              <Title title="Login" />
              <div className="mb-3 mt-4">
                <label htmlFor="">Email</label>
                <input type="email" required className='inputField' onChange={e => setEmail(e.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <label htmlFor="">password</label>
                <input type="password" required className='inputField' onChange={e => setPassword(e.target.value)} value={password} />
              </div>
              <div className="mb-3">
                <button type='submit' className='lgBtn'>Login</button>
              </div>
              <p><NavLink className="linkBtn" to="/admin/forgotpassword">Forgot Password</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;