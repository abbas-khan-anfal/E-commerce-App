import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Success = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');

    const verifyPaymentHandler = async (session_id) => {
      if(!session_id || window.hasPaymentVerified) return;
      window.hasPaymentVerified = true;

      try
      {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/verify-stripe-payment`, {sessionId : session_id}, {
					headers : {
						'Content-Type' : 'application/json',
					},
					withCredentials : true
				});
				
        if(response.data.success)
        {
          toast.success(response.data.message);
        }
        else
        {
          toast.error(response.data.message);
        }
      }
      catch(error)
      {
        console.log(error.response?.data.message || error.message);
      }
    }

    useEffect(() => {
      if(sessionId)
      {
        verifyPaymentHandler(sessionId);
      }
    },[sessionId]);
  return (
    <div class="container-fluid order_success_page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-10 col-sm-12 text-center">
            <span class="success_icon">
              <i class="fa-solid fa-circle-check"></i>
            </span>
            <h1>Thanks For Your Order!</h1>
            <p>
              Your Order successfully submitted! You will recieve your products
              in just <span>3</span> Business Days.
            </p>
          </div>

          <div class="col-lg-10 col-md-10 col-sm-12 text-center">
            <button class="continue_shopping" onClick={() => navigate('/shop')}>
              <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping
            </button>
            <button onClick={() => navigate('/user/profile')} class="view_shopping">
              <i class="fa-regular fa-eye"></i> View Your Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
