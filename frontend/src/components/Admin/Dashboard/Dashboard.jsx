import React, { useContext, useState, useEffect } from 'react';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';
import Title from './components/Title/Title';
import { Routes, Route, Navigate } from 'react-router-dom';
import siteContext from '../../../context/Site Context/SiteContext';
import AddProduct from './components/Products/AddProduct';
import AllProducts from './components/Products/AllProducts';
import UpdateProduct from './components/Products/UpdateProduct';
import Home from './components/Home/Home';
import NotFound from '../../Not Found/NotFound';
import AddCategory from './components/Category/AddCategory';
import AllCategories from './components/Category/AllCategories';
import AddBrand from './components/Brand/AddBrand';
import AllBrand from './components/Brand/AllBrand';
import Messages from './components/Messages/Messages';
import UpdateCategory from './components/Category/UpdateCategory';
import UpdateBrand from './components/Brand/UpdateBrand';
import LoaderLg from '../../Loaders/Loader-lg';
import Users from './components/Users/Users';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { dashNav, setDashNav, logoutAdminHandler } = useContext(siteContext);
  

  useEffect(() => {
    setLoading(false);
  },[]);

  if(loading) return <LoaderLg/>
  return (
    <>

      <aside className={`${dashNav ? 'show' : ''}`}>
        <button className='dashOpenBtn' onClick={e => setDashNav(!dashNav)}><i className="fa-solid fa-burger"></i></button>
        <NavLink className="dashLogo" to='/admin/dashboard' >FlipCart</NavLink>
        <ul>
          <li><NavLink to='/admin/dashboard'><i className="fa-solid fa-house"></i> Home</NavLink></li>
          <li><NavLink to='/admin/allproducts'><i className="fa-brands fa-product-hunt"></i> Products</NavLink></li>
          <li><NavLink to='/admin/addproduct'><i className="fa-solid fa-square-plus"></i> Add Products</NavLink></li>
          <li><NavLink to='/admin/allcategories'><i class="fa-solid fa-layer-group"></i> Categories</NavLink></li>
          <li><NavLink to='/admin/addcategory'><i className="fa-solid fa-square-plus"></i> Add Category</NavLink></li>
          <li><NavLink to='/admin/allbrands'><i class="fa-solid fa-fire"></i> Brands</NavLink></li>
          <li><NavLink to='/admin/addbrand'><i className="fa-solid fa-square-plus"></i> Add Brand</NavLink></li>
          <li><NavLink to='/admin/messages'><i class="fa-solid fa-message"></i> Messages</NavLink></li>
          <li><NavLink to='/admin/users'><i class="fa-solid fa-user"></i> Users</NavLink></li>
        </ul>
      </aside>

      <section>
        <header>
          <div>
            <button className='dashCloseBtn' onClick={e => setDashNav(!dashNav)}><i className="fa-brands fa-xing"></i></button>
            <h5>Dashboard</h5>
          </div>

          {/* dropdown */}
          <div className="dropdown">
          <button className="dropDownBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-user"></i>
          </button>
          <ul className="dropdown-menu shadow">
            <li><a className="dropdown-item" href="#" onClick={logoutAdminHandler}><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
          </ul>
        </div>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Navigate to='/admin/dashboard' />} />
            <Route path='/dashboard' element={<Home/>} />
            <Route path='/allproducts' element={<AllProducts/>} />
            <Route path='/addproduct' element={<AddProduct/>} />
            <Route path='/updatecategory/:id' element={<UpdateCategory/>} />
            <Route path='/updatebrand/:id' element={<UpdateBrand/>} />
            <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
            <Route path='/addcategory' element={<AddCategory/>} />
            <Route path='/allcategories' element={<AllCategories/>} />
            <Route path='/addbrand' element={<AddBrand/>} />
            <Route path='/allbrands' element={<AllBrand/>} />
            <Route path='/messages' element={<Messages/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='*' element={<Navigate to='/admin/dashboard' />} />
          </Routes>
        </main>
      </section>
    </>
  )
}

export default Dashboard;