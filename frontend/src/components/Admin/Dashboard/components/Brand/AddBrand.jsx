import React, { useState } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddBrand() {
  const [bName, setBName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const brandObj = {b_name : bName.toLowerCase()}
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/brand/add`, brandObj, {
        headerr : {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      setBName("");
      toast.success(response.data.message);
      console.clear();
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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Add New Brand" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={submitHandler}>
            <div className="mt-3">
              <label htmlFor="">Brand Name</label>
              <input type="text" required onChange={e => setBName(e.target.value)} value={bName} className='inputField' />
            </div>
            <div className="mt-3">
              <button type='submit' disabled={loading} className='mdBtn'>Save Brand</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBrand;