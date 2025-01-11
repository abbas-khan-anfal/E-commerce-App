import React, { useContext, useEffect, useState } from 'react';
import Title from '../Title/Title';
import siteContext from '../../context/Site Context/SiteContext';
import Message from '../Not Found/Message';
import profilepic from '../assets/profilepic.png';
import axios from 'axios';
import LoaderMd from '../Loaders/Loader-md';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { logoutUserHandler, userProfile, fetchUsersOrder, orders } = useContext(siteContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const orderStateUpdater = async (oid) => {
        if(confirm("Do you really recieved your product."))
        {
            setLoading(true);
            try
            {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/orderstateupdate?oid=${oid}`, {
                    withCredentials : true
                });
                fetchUsersOrder();
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
    }

    useEffect(() => {
        fetchUsersOrder();
        setLoading(false);
    },[]);

    if(loading) return <LoaderMd />


  return (
    <div className="container-fluid profilePage">
        <div className="container">
            <div className="row">
                
                <div className="col-lg-3 col-md-12 col-sm-12 userSection">
                    
                    <div className="profile-pic">
                        <img src={profilepic} alt="Profile Picture" />
                    </div>

                    {
                        Object.keys(userProfile).length > 0
                        ?
                        (<>
                        <h4>{userProfile.username}</h4>
                        <h6>{userProfile.email}</h6>
                        <h6>Joined At : <span>{userProfile.join_date}</span></h6>
                        <h6>Total Item Purchased : {userProfile.items_purchased}<span>{userProfile.item_purchased}</span></h6>
                        <button className='mdBtn red' onClick={logoutUserHandler}>Logout</button>
                        </>)
                        :
                        (<Message message="Login First" />)
                    }
                </div>

                <div className="col-lg-9 col-md-12 col-sm-12 table-responsive-lg table-responsive-sm table-responsive-md">
                    <Title title="Your Orders" />
                    <table className='table table-light'>
                        <thead>
                        <tr>
                            <th>Sr:no</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Qty</th>
                            <th>View</th>
                            <th>Order Status</th>
                        </tr>
                        </thead>
                        <tbody>
                                {
                                    orders.length > 0
                                    ?
                                    orders.map((order, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{moment(order.order_date).fromNow()}</td>
                                            <td>${order.total_amount}.00</td>
                                            <td>{order.p_ids.length}</td>

                                            <td><button onClick={() => navigate(`/user/order-details/${order._id}`)} className='mdBtn green'><i className="fa-solid fa-eye"></i></button></td>

                                            <td><button disabled={order.status==="Pending" ? false : true} onClick={() => orderStateUpdater(order._id)} className='mdBtn red '>{order.status}</button></td>

                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="6">You have no orders yet.</td>
                                    </tr>
                                }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile;