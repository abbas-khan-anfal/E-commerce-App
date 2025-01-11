import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Slider from './components/Slider/Slider';
import Products1 from './components/Products/Products1';
import Products2 from './components/Products/Products2';
import Contact from './components/Contact/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jumbotron from './components/Jumbotron/Jumbotron';
import About from './components/About/About';
import Shop from './components/Shop Page/Shop';
import Search from './components/Search/Search';
import Message from './components/Not Found/Message';
import NotFound from './components/Not Found/NotFound';
import ProDetail from './components/Pro Detail/ProDetail';
import Admin from './components/Admin/Admin';
import { Toaster } from 'react-hot-toast';
import siteContext from './context/Site Context/SiteContext';
import User from './components/User/User';
import LoaderLg from './components/Loaders/Loader-lg';
import LoaderMd from './components/Loaders/Loader-md';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success & Cancel/Success';
import Cancel from './components/Success & Cancel/Cancel';

function App() {
  const { userStateHandler, userState } = useContext(siteContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userStateHandler();
    setLoading(false);
  },[userState]);


  if(loading) return <LoaderLg/>


  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/' element={
          <>
            <Header/>
            <Slider/>
            <Products1/>
            <Jumbotron/>
            <Products2/>
            <Footer/>
          </>
        }/>
        <Route path='/contact' element={
          <>
            <Header/>
            <Contact/>
            <Footer/>
          </>
        }/>
        <Route path='/about' element={
          <>
            <Header/>
            <About/>
            <Footer/>
          </>
        }/>
        <Route path='/shop' element={
          <>
            <Header/>
            <Shop/>
            <Footer/>
          </>
        }/>
        <Route path='/billing-details' element={
          <>
            <Header/>
            <Checkout/>
            <Footer/>
          </>
        }/>
        <Route path='/success' element={
            <Success/>
        }/>
        <Route path='/cancel' element={
            <Cancel/>
        }/>
        <Route path='/search/:searchterm' element={
          <>
            <Header/>
            <Search/>
            <Footer/>
          </>
        }/>
        <Route path='/search' element={
          <>
            <Header/>
            <Message message="Search term is empty! Try search something!" />
            <Footer/>
          </>
        }/>
        <Route path='/product_detail/:id' element={
          <>
            <Header/>
            <ProDetail />
            <Footer/>
          </>
        }/>
        <Route path='/user/*' element={
          <User />
        }/>
        <Route path='/admin/*' element={
          <Admin />
        }/>
        <Route path='*' element={
          <NotFound/>
        }/>
      </Routes>
    </Router>
  )
}

export default App;