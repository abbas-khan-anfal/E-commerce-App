import React from 'react';
import './Slider.css';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';

function Slider() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 p-0'>
                {/* ====== */}
                <div id="carouselExampleFade" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={one} className="d-block" alt="..."></img>
                        </div>
                        <div className="carousel-item">
                        <img src={two} className="d-block" alt="..."></img>
                        </div>
                        <div className="carousel-item">
                        <img src={one} className="d-block" alt="..."></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="prevIcon" aria-hidden="true">
                        <i className="fa-solid fa-chevron-left"></i>
                        </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="nextIcon" aria-hidden="true">
                        <i className="fa-solid fa-chevron-right"></i>
                        </span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            {/* ======== */}
            </div>
        </div>
    </div>
  )
}

export default Slider;