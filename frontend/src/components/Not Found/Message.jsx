import React from 'react';

function Message({message}) {
  return (
    <div className='container-fluid' style={{backgroundColor:'#F9F9FF',paddingTop:'100px',paddingBottom:'100px'}}>
        <div className='container'>
            <div className='row'>
                <div className='col-12' style={{padding:'30px', color:'#464E9F',fontWeight:'600',fontSize:'17px',border:'2px solid #464E9F',borderRadius:'5px', textAlign:'center'}}>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Message;