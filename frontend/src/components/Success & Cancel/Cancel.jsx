import React from "react";
import './Style.css';
import { useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate();
  return (
    <div class="container-fluid order_success_page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <span class="canceled_icon">
              <i class="fa-solid fa-circle-xmark"></i>
            </span>
            <h1>Your order successfully canceled!</h1>
          </div>

          <div class="col-10 text-center">
            <button onClick={() => navigate('/shop')} class="continue_shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
