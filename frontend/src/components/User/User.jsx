import React, { useState, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cart from '../Cart Page/Cart';
import Checkout from '../Checkout/Checkout';
import Wishlist from '../Wishlist/Wishlist';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import { Rotues, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '../Not Found/NotFound';
import siteContext from '../../context/Site Context/SiteContext';
import LoaderMd from '../Loaders/Loader-md';
import OrderDetails from './Order_Details';

const User = () => {
    const {userState} = useContext(siteContext);
    const [loading, setLoading] = useState(true);

    useState(() => {
        setLoading(false);
    },[]);

    if(loading) return <LoaderMd/>


    return (
            <Routes>
            {
                userState
                ?
                (
                    <>
                        <Route path='/' element={
                            <Navigate to="/user/cart" />
                        }/>
                        <Route path='/cart' element={
                        <>
                            <Header/>
                            <Cart />
                            <Footer/>
                        </>
                        }/>
                        <Route path='/checkout' element={
                        <>
                            <Header/>
                            <Checkout />
                            <Footer/>
                        </>
                        }/>
                        <Route path='/wishlist' element={
                        <>
                            <Header/>
                            <Wishlist />
                            <Footer/>
                        </>
                        }/>
                        <Route path='/profile' element={
                        <>
                            <Header/>
                            <Profile />
                            <Footer/>
                        </>
                        }/>
                        <Route path='/order-details/:oid' element={
                        <>
                            <Header/>
                            <OrderDetails />
                            <Footer/>
                        </>
                        }/>
                    </>
                )
                :
                (
                    <>
                        <Route path='/login' element={
                            <>
                            <Header/>
                            <Login />
                            <Footer/>
                            </>
                        }/>
                        <Route path='/signup' element={
                            <>
                            <Header/>
                            <Signup />
                            <Footer/>
                            </>
                        }/>
                    </>
                )
            }
            <Route path='*' element={
                <Navigate to={userState ? '/user/profile' : '/user/login'} />
            }/>
          </Routes>  
    )
}

export default User;
