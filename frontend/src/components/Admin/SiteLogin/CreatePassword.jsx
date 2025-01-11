import React from 'react';
import Title from '../../Title/Title';
import { NavLink } from 'react-router-dom';
import './Auth.css';

function CreatePassword() {
  return (
    <div className="container-fluid authContainer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-lg-4 col-md-6 col-sm-12">
            <form action="">
              <Title title="Create New Password" />
              <div className="mb-3 mt-4">
                <label htmlFor="">Password</label>
                <input type="password" className='inputField' />
              </div>
              <div className="mb-3">
                <label htmlFor="">Confirm Password</label>
                <input type="password" className='inputField' />
              </div>
              <div className="mb-3">
                <button type='submit' className='lgBtn'>Save Password</button>
              </div>
              <p><NavLink className="linkBtn" to="/admin/login">Back To Login</NavLink></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePassword;