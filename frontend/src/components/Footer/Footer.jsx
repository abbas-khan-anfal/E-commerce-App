import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="container-fluid">
    <div className="container">
    <div className="row">

        <div className="col-lg-4 col-md-6 col1">
            <img src={logo}></img>
            <p>The customer is at the heart of our unique business model, which includes design.</p>
                <ul>
                    <li><a href=""><i className="fa-brands fa-cc-mastercard"></i></a></li>
                    <li><a href=""><i className="fa-brands fa-cc-visa"></i></a></li>
                    <li><a href=""><i className="fa-brands fa-cc-apple-pay"></i></a></li>
                    <li><a href=""><i className="fa-brands fa-paypal"></i></a></li>
                </ul>
        </div>

        <div className="col-lg-2 col-md-3 col2">
            <h5>SHOPPING</h5>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Course</a></li>
                    <li><a href="">Gallery</a></li>
                    <li><a href="">Content</a></li>
                </ul>
        </div>

        <div className="col-lg-2 col-md-3 col2">
            <h5>SHOPPING</h5>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Course</a></li>
                    <li><a href="">Gallery</a></li>
                    <li><a href="">Content</a></li>
                </ul>
        </div>

        <div className="col-lg-4 col-md-12 col3">
            <h5>NEWLETTER</h5>
            <p>Be the first to know about new arrivals, look books, sales & promos!</p>
            <div className="form-group">
                <input type="email" placeholder="Your email" name=""/>
            </div>
        </div>

        <div className="col-12 col4">
            <p>Copyright © 20242020 All rights reserved | This template is made with  by Colorlib</p>
        </div>

    </div>
    </div>
</footer>
  )
}

export default Footer;