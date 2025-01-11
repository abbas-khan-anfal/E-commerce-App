import React, { useContext, useState, useEffect } from 'react';
import '../../index.css';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import Title from '../Title/Title';
import siteContext from '../../context/Site Context/SiteContext';
import axios from 'axios';
import Message from '../Not Found/Message';
import LoaderMd from '../Loaders/Loader-md';
import {useNavigate} from 'react-router-dom';

function Products2() {
    const { addToWishlistHandler, addToCartHandler, wishlistItems, fetchAllWishlistProducts } = useContext(siteContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductsHanlder = async () => {
        setLoading(true);
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/homeproducts`, {
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

    useEffect(() => {
        fetchProductsHanlder();
        fetchAllWishlistProducts();
    },[]);


    if(loading) return <LoaderMd/>
  return (
    <div className="container-fluid productContainer">
        <div className='container'>
            <div className="row">

                <div className="col-12 mb-4">
                    <Title title="Featured Products" />
                    <div className='d-flex justify-content-end'>
                        <a className='linkBtn' href=''>View all</a>
                    </div>
                </div>

                {
                    products.length > 0
                    ?
                    products.map((product, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-12">
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
                }


            </div>
        </div>
    </div>
  )
}

export default Products2;