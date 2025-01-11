import React from 'react';
import './About.css';
import Title from '../Title/Title';
import one from '../assets/one.jpg';

function About() {
  return (
    <div className='container-fluid aboutusSection'>
    <div className="container pt-4">
        <div className="row">
              <Title title="About Us" />

        </div>
    </div>

    <div className="container why_choose_us">
        <div className="row py-5">
            <div className="col-lg-7 col-md-12 col-sm-12 col1">
               <div className="row">
                   <div className="col-lg-10 col-md-10 col-sm-12">
                        <h2 className="top_heading">Why Choose Us</h2>
                        <p className="top_p">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                   </div>
                   
                   <div className="col-lg-6 col-md-6 col-sm-12 service_col">
                        <i className="fa-solid fa-truck-fast"></i>
                       <h6>Fast & Free Shipping</h6>
                       <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                   </div>

                   <div className="col-lg-6 col-md-6 col-sm-12 service_col">
                        <i className="fa-solid fa-shop"></i>
                       <h6>Easy to Shop</h6>
                       <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                   </div> 

                   <div className="col-lg-6 col-md-6 col-sm-12 service_col">
                        <i className="fa-regular fa-life-ring"></i>
                       <h6>24/7 Support</h6>
                       <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                   </div> 

                   <div className="col-lg-6 col-md-6 col-sm-12 service_col">
                        <i className="fa-solid fa-right-left"></i>
                       <h6>Easy Return</h6>
                       <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                   </div>

               </div>
            </div>

            <div className="col-lg-5 col-md-12 col-sm-12 col2">
                <img src={one}></img>
            </div>
        </div>
    </div>



    <div className="container who_we_are">
        <div className="row">
            <div className="col-12">
              <h2 className="top_heading">Who We Are?</h2>
                </div>


            <div className="col-12 main_col shadow">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col1 p-3">
                        <h1>Our Story!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco </p>

                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col2 p-3">
                        <img src={one}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div className="container our_team">
        <div className="row">
            <div className="col-12">
              <h2 className="top_heading">Out Team</h2>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-12 pt-3">
                <div className="card shadow">
                    <img src={one} className="card-img-top"></img>
                    <div className="card-body">
                        <h4>Mukeesh Ambani</h4>
                        <span>Web Developer</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-12 pt-3">
                <div className="card shadow">
                    <img src={one} className="card-img-top"></img>
                    <div className="card-body">
                        <h4>Mukeesh Ambani</h4>
                        <span>Web Developer</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-12 pt-3">
                <div className="card shadow">
                    <img src={one} className="card-img-top"></img>
                    <div className="card-body">
                        <h4>Mukeesh Ambani</h4>
                        <span>Web Developer</span>
                    </div>
                </div>
            </div>

             <div className="col-lg-3 col-md-4 col-sm-12 pt-3">
                <div className="card shadow">
                    <img src={one} className="card-img-top"></img>
                    <div className="card-body">
                        <h4>Mukeesh Ambani</h4>
                        <span>Web Developer</span>
                    </div>
                </div>
            </div>


        </div>
    </div>
    </div>
  )
}

export default About;