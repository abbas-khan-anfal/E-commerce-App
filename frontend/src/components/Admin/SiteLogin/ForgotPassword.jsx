import React, { useState } from 'react';
import Title from '../../Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [showPassForm, setShowPassForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  const findAccountHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/adminforgotpassword`,{email}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      setAdminEmail(email);
      toast.success(`${response.data.message}, wait..`);
      setShowPassForm(true);
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }


  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      if(password !== confirm_password)
      {
        toast.error("Password and Confirm Password does not match");
        return;
      }

      if(password.length < 7)
      {
        toast.error("Password must be 7 characters or greater");
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/resetpassword`,{password, email : adminEmail}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      if(response.data.success)
      {
        toast.success(`${response.data.message}, You will be redirected..`);
        // redirect the admin to login
        setTimeout(() => {
          navigate('/admin/login')
          }, 5000);
      }
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <>
    {
      showPassForm
      ?
      <div className="container-fluid authContainer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-lg-4 col-md-6 col-sm-12">
            <form action="" onSubmit={resetPasswordHandler}>
              <Title title="Create New Password" />
              <div className="mb-3 mt-4">
                <label htmlFor="">Password</label>
                <input type="password" required className='inputField' onChange={e => setPassword(e.target.value)} value={password} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Confirm Password</label>
                <input type="password" required className='inputField' onChange={e => setConfirmPassword(e.target.value)} value={confirm_password} />
              </div>
              <div className="mb-3">
                <button disabled={loading} type='submit' className='lgBtn'>Save Password</button>
              </div>
              <p><NavLink className="linkBtn" to="/admin/login">Back To Login</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    :
    <div className="container-fluid authContainer">
    <div className="container">
      <div className="row justify-content-center">

        <div className="col-lg-4 col-md-6 col-sm-12">
          <form action="" onSubmit={findAccountHandler}>
            <Title title="Forgot Password" />
            <div className="mb-3 mt-4">
              <label htmlFor="">Email</label>
              <input type="email" required className='inputField' onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div className="mb-3">
              <button disabled={loading} type='submit' className='lgBtn'>Find Account</button>
            </div>
            <p><NavLink className="linkBtn" to="/admin/login">Back To Login </NavLink></p>
          </form>
        </div>
      </div>
    </div>
  </div>
    }
    </>
  )
}

export default ForgotPassword;