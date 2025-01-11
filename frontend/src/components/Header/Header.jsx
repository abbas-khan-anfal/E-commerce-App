import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import siteContext from '../../context/Site Context/SiteContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Cart from '../Cart Page/Cart';

function Header() {
    const { thirdNav, setThirdNav, secondNav, setSeconNav, dropDown, setDropDown, userState, totalWshProductsCount, wshCount, totalCartProductsCount, cartCount } = useContext(siteContext);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // dopdown toggle handler
    const dropDownToggleHandler = (e) => {
        e.preventDefault();
        setDropDown(!dropDown);
    }

    // search submission handler
    const searchSubmissionHandler = (e) => {
        e.preventDefault();
        const trimmedSearchTerm = searchTerm.trim();
        if(trimmedSearchTerm && trimmedSearchTerm.length > 0)
        {
            navigate(`/search/${trimmedSearchTerm}`);
        }
        else
        {
            navigate('/search');
        }
    }

    useEffect(() => {
        totalWshProductsCount();
        totalCartProductsCount();
    },[]);


  return (
    <nav>
        <div className='firstNav'>
            <div className='logoDiv'>
                <button className='navOpenToggler' onClick={() => setSeconNav(!secondNav)}><i className="fa-solid fa-burger"></i></button>
                <NavLink to="/"><img src={logo} className='logo'/></NavLink>
            </div>
            <div>
                <button onClick={() => setThirdNav(!thirdNav)}><i className="fa-solid fa-magnifying-glass"></i></button>

                <button className='badgeBtn' onClick={() => {
                    userState ? navigate('/user/cart') : navigate('/user/login')
                }}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>{cartCount}</span>
                </button>
                <button className='badgeBtn' onClick={() => {
                    userState ? navigate('/user/wishlist') : navigate('/user/login')
                }}>
                    <i className="fa-solid fa-heart"></i>
                    <span>{wshCount}</span>
                </button>

                <button><i className="fa-solid fa-user" onClick={() => {
                    userState ? navigate('/user/profile') : navigate('/user/login')
                }
                }></i></button>
            </div>
        </div>
        <div className={`secondNav ${secondNav ? 'show': ''}`}>
            <button className='navCloseToggler' onClick={() => setSeconNav(!secondNav)}><i className="fa-brands fa-xing"></i></button>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/shop">Shop</NavLink></li>

                {/* dropdown */}
                {/* <li className='dropDown'>
                    <NavLink to="/category/kkk" onClick={dropDownToggleHandler} className='dropDownToggler'>Categories <i className="fa-solid fa-caret-down"></i></NavLink>

                    <div className={`dropDownMenu shadow ${dropDown ? 'show' : ''}`}>
                        <NavLink to="/" >Home</NavLink>
                        <NavLink to="/">Somethin else</NavLink>
                    </div>
                </li> */}

                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>

            </ul>
        </div>
        <div className={`thirdNav ${thirdNav ? 'show' : ''}`}>
            <form onSubmit={searchSubmissionHandler}>
                <input onChange={e => setSearchTerm(e.target.value)}  value={searchTerm} type="search" placeholder='search something...' />
                <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </nav>
  )
}

export default Header;