import React, { useContext, useEffect, useState } from 'react';
import Title from './../Title/Title';
import './Auth.css';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import LoaderMd from '../Loaders/Loader-md';
import Message from '../Not Found/Message';
import siteContext from '../../context/Site Context/SiteContext';
import moment from 'moment/moment';

const OrderDetails = () => {
    const [loading, setLoading] = useState(false);
    const { oid } = useParams();
    const [order, setOrder] = useState({});

    const fetchOneOrder = async (o_id) => {
        setLoading(true);
        try
        {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/fetchoneorder?oid=${o_id}`, {
                withCredentials : true
            });
            setOrder(response.data.order);
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
        fetchOneOrder(oid);
    },[oid]);


    if(loading) return <LoaderMd />


    return (
        <div className='container orderDetailPage'>
            <div className="row">
                <div className="col-12">
                    <p><NavLink to="/" className='linkBtn'><i className="fa-solid fa-house"></i> Home <i className="fa-solid fa-angle-right"></i></NavLink> Order</p>
                </div>
            </div>

            <div className="row detailRow">
                {
                    Object.keys(order).length > 0
                    ?
                    <>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>Your Information</h3>
                        {
                            <>
                            <h6>Full Name : <span>{`${order.f_name} ${order.l_name}`}</span></h6>
                            <h6>Email : <span>{order.email}</span></h6>
                            <h6>Phone : <span>{order.phone}</span></h6>
                            <h6>Country : <span>{order.country}</span></h6>
                            <h6>State : <span>{order.state}</span></h6>
                            <h6>City : <span>{order.city}</span></h6>
                            <h6>Zip : <span>{order.zip}</span></h6>
                            </>
                        }
                        <hr></hr>

                        <h3>Payment Method</h3>
                        {
                            <h6>Payment Method : <span>{order.payment_method}</span></h6>
                        }
                        <hr></hr>

                        <h3>Order Status</h3>
                        {
                            <h6>Status : <span>{order.status}</span></h6>
                        }

                        <h3>Order Date</h3>
                            <h6>Order Date : <span>{moment(order.order_date).format("D MM, YYYY")}</span></h6>
                        <hr></hr>

                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>Items Purchased</h3>
                        {
                            order.p_ids.map((product,index) => (
                                <div className='card shadow' key={index}>
                                <h6>Product : <span>{product.p_title}</span></h6>
                                <h6>Per Item Price : <span>${product.fixed_price}.00</span></h6>
                                </div>
                            ))
                        }

                        <h3>Total Amount</h3>
                            {
                                <h6>Subtotal : <span>${order.total_amount}.00</span></h6>
                            }
                        <hr></hr>
                    </div>
                    </>
                    :
                    <Message message="Order not found" />
                }
                

            </div>

        </div>
    );
}

export default OrderDetails;
