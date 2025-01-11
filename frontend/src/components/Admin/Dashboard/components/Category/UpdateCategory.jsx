import React, { useEffect, useState } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function UpdateCategory() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  // fetch category for update
  const fetchCategoryHandler = async () => {
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/categoryinform/${id}`,{
        withCredentials : true
      });
      setCategory(response.data.category.c_name);
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
      const updatedCatObj = {c_name : category};
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/category/update/${id}`,updatedCatObj,{
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
    fetchCategoryHandler();
  },[id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Update Category" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={updateHandler}>
            <div className="mt-3">
              <label htmlFor="">Category Name</label>
              <input type="text" onChange={e => setCategory(e.target.value)} value={category} className='inputField' />
            </div>
            <div className="mt-3">
              <button type='submit' disabled={loading} className='mdBtn'>Save Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCategory;