import React, { useState} from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddCategory() {
  const [cName, setCName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const categoryObj = {c_name : cName.toLowerCase()}
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/add`, categoryObj, {
        headerr : {
          'Content-Type': 'application/json',
        },
        withCredentials : true
      });
      setCName("");
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
          <Title title="Add New Category" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={submitHandler}>
            <div className="mt-3">
              <label htmlFor="">Category Name</label>
              <input type="text" required onChange={e => setCName(e.target.value)} value={cName} className='inputField' />
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

export default AddCategory;