import React, { useContext, useState, useEffect } from 'react';
import '../../index.css';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import Title from '../Title/Title';
import siteContext from '../../context/Site Context/SiteContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './Shop.css';
import axios from 'axios';
import Message from '../Not Found/Message';
import LoaderMd from '../Loaders/Loader-md';

function Shop() {
    const { addToWishlistHandler, addToCartHandler, wishlistItems, fetchAllWishlistProducts } = useContext(siteContext);
    const navigate = useNavigate();
    const [range, setRange] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageTitle, setPageTitle] = useState("");

    const fetchProductsHanlder = async (priceRange,cid) => {
        setLoading(true);
        let url;
        url = priceRange !== "" ? url = `fetchforshop?price=${priceRange}` : url = `fetchforshop?cid=${cid}`
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/${url}`, {
            withCredentials : true
          });
          setProducts(response.data.products);
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


      const fetchCategoriesForShop = async () => {
        setLoading(true);
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/fetchfordash`, {
            withCredentials : true
          });
          setCategories(response.data.categories);
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
        window.scrollTo(0, 0);
        fetchProductsHanlder(range,"");
        fetchAllWishlistProducts();
        fetchCategoriesForShop();
    },[]);


  return (
    <div className="container-fluid productContainer">
    <div className='container'>

        <div className="row">
            
            <div className="col-lg-3 col-md-12 col-sm-12">
                <div className='fltrByCategory'>
                    <h5 className='filterTitle'>Categories</h5>
                    {
                        !loading
                        ?
                        categories.length > 0
                        ?
                        categories.map((category, index) => (
                            <div key={index} className='categoryDiv'>
                                <button onClick={() => {
                                    fetchProductsHanlder("",category._id);
                                    setPageTitle(`/ Category : ${category.c_name}`);
                                }
                                } className='linkBtn'>{category.c_name}</button>
                                <span>{category.total_products}</span>
                            </div>
                        ))
                        :
                        <Message message="No category found!" />
                        :
                        <LoaderMd />



                    }
                </div>

                <div className='fltrByPrice'>
                    <h5 className='filterTitle'>Filter By Price</h5>
                    <div className='mt-3'>
                        <input type="range" onChange={e => setRange(e.target.value)} max={5000} value={range} />
                    </div>
                    <span>$0 - {`$${range}`}</span>
                    {/* // creat a filter button */}
                    <button disabled={loading} onClick={() => {
                        fetchProductsHanlder(range);
                        setPageTitle(`/ Filter : $0 - $${range}`);
                    }} className='lgBtn'>Apply Filter</button>
                </div>

            </div>



            <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="row">

                <div className="col-12 mb-4">
                    <Title title={`All Shop${pageTitle}`} />
                </div>
                
                {
                    !loading
                    ?
                    products.length > 0
                    ?
                    products.map((product, index) => (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                            <div className="card shadow">
                                <button className='wishlistBtn' onClick={() => addToWishlistHandler(product._id)}>
                                {wishlistItems &&
                                    wishlistItems.some(item => item && item._id === product._id) ? (
                                        <i className="fas fa-heart"></i>
                                    ) : (
                                        <i className="far fa-heart"></i>
                                )}
                                </button>
                                <div className='cardImgDiv'>
                                    <img src={product.img_path1} className='card-img-top' />
                                </div>
                                <div className="card-body">
                                    <h4>{product.p_title.substring(0,25) + "..."}</h4>
                                    <h5>Rs : {product.fixed_price} <s>{product.original_price}</s></h5>
                                    <button className='lgBtn mb-2' onClick={() => navigate(`/product_detail/${product._id}`)}>
                                        <span>Quick View </span>
                                        <span><i className="fa-solid fa-eye"></i></span>
                                    </button>
                                    <button className='lgBtn' onClick={() => addToCartHandler(product._id, 1)}>
                                        <span>Add To Cart </span>
                                        <span><i className="fa-solid fa-cart-arrow-down"></i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                :
                <Message message="No products found" />
                :
                <LoaderMd/>
                }
                    
                    
                    
                </div>
            </div>

        </div>
    </div>
</div>
  )
}

export default Shop;