import React, { useEffect, useState } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function UpdateBrand() {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  // fetch brand for update
  const fetchBrandHandler = async () => {
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand/brandinform/${id}`,{
        withCredentials : true
      });
      setBrand(response.data.brand.b_name);
    }
    catch(error)
    {
      console.log(error.response?.data.message || error.message);
    }
  }

  // update handler
  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const updateBraObj = {b_name : brand};
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/brand/update/${id}`,updateBraObj,{
        headers : {
          'Content-Type' : 'application/json',
        },
        withCredentials : true
      });
      toast.success(response.data.message)
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


  useEffect(() => {
    fetchBrandHandler();
  },[id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Update Brand" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={updateHandler}>
            <div className="mt-3">
              <label htmlFor="">Brand Name</label>
              <input type="text" onChange={e => setBrand(e.target.value)} value={brand} className='inputField' />
            </div>
            <div className="mt-3">
              <button type='submit' disabled={loading}className='mdBtn'>Save Brand</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBrand;