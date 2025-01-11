import React, { useEffect, useState } from 'react';
import Title from '../Title/Title'
import './Home.css';
import axios from 'axios';
import LoaderMd from '../../../../Loaders/Loader-md';

function Home() {

  const [loading, setLoading] = useState(false);
  const [brandCount, setBrandCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const fetchHomeDataHandler = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashhome/totaldata`, {
        withCredentials : true
      });
      setBrandCount(response.data.brandCount)
      setCategoryCount(response.data.categoryCount)
      setMessageCount(response.data.messageCount)
      setProductCount(response.data.productCount)
      setUserCount(response.data.userCount)
    }
    catch(error)
    {
      console.log(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchHomeDataHandler();
  },[]);
  return (
    <>
    <div className='container DashBoardHome'>
      <div className='row'>

        <div className="col-12">
          <Title title="Home" />
        </div>

        {
          loading
          ?
          <LoaderMd/>
          :
          <>
        <div className='col-12'>
          <div className='row'>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i className="fa-brands fa-product-hunt"></i>
                <h3>Total Products</h3>
                <span>{productCount}</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i className="fa-solid fa-user"></i>
                <h3>Total Users</h3>
                <span>{userCount}</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i class="fa-solid fa-message"></i>
                <h3>Total Message</h3>
                <span>{messageCount}</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i class="fa-solid fa-fire"></i>
                <h3>Total Brands</h3>
                <span>{brandCount}</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i class="fa-solid fa-layer-group"></i>
                <h3>Total Categories</h3>
                <span>{categoryCount}</span>
              </div>
            </div>
            

          </div>
          
        </div>
        </>
        }
      </div>
    </div>
    </>
  )
}

export default Home;