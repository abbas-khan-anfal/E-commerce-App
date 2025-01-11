import React from 'react';
import './Jumbotron.css';
import { useNavigate } from 'react-router-dom';

function Jumbotron() {
    const navigate = useNavigate();
  return (
    <div className='container-fluid jumbotron'>
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className="parallax">
                        <div>
                            <h1>Friday Flash Sale!.🎉🎉🎉</h1>
                            <p>
                                Get the big sale especially on friday on each products.
                            </p>
                            <button onClick={() => navigate('/shop')} className="mdBtn lightBtn">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron;