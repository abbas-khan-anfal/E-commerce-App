import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className='container-fluid notFound'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='mb-3'>404 | Page Not Found</h2>
                    <p style={{color:'grey'}}>We are observing you!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound;