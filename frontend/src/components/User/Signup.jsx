import React, {useState} from 'react';
import Title from '../Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(password.length < 7)
    {
      toast.error("Password must be 7 characters or longer");
      setLoading(false);
      return;
    }

    try
    {
      const userData = {username, email, password};
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signupuser`,userData,{
        headers : {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      toast.success(response.data.message);
      navigate('/user/login');
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  };


  return (
    <div className="container-fluid authContainer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12">
            <p><NavLink to="/" className='linkBtn'><i className="fa-solid fa-house"></i> Home <i className="fa-solid fa-angle-right"></i></NavLink> Signup</p>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <form action="" onSubmit={submitHandler}>
              <Title title="Signup" />
              <div className="mb-3 mt-4">
                <label htmlFor="">Username</label>
                <input type="text" onChange={e => setUsername(e.target.value)} required value={username} className='inputField' />
              </div>
              <div className="mb-3 mt-4">
                <label htmlFor="">Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)} required value={email} className='inputField' />
              </div>
              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} required value={password} className='inputField' />
              </div>
              <div className="mb-3">
                <button type='submit' disabled={loading} className='lgBtn'>Signup</button>
              </div>
              <p>Already have an account? <NavLink className="linkBtn" to="/user/login">Login</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;