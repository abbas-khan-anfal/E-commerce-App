import React, { useContext, useState, useEffect } from 'react';
import '../../index.css';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import Title from '../Title/Title';
import siteContext from '../../context/Site Context/SiteContext';
import axios from 'axios';
import LoaderMd from '../Loaders/Loader-md';
import toast from 'react-hot-toast';
import Message from '../Not Found/Message';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
    const { addToCartHandler } = useContext(siteContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWshProducts = async () => {
        setLoading(true);
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/getwshproducts`, {
            withCredentials : true
          });
          setProducts(response.data.allProducts);
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

      const removeWishlistProduct = async (pid) => {
        // if(confirm("Do you really want to remove this product from wishlist?"))
        // {
          setLoading(true);
          try
          {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/remove/${pid}`, {
              withCredentials : true
            });
            toast.success(response.data.message);
            fetchWshProducts();
          }
          catch(error)
          {
            toast.error(error.response?.data.message || error.message);
          }
          finally
          {
            setLoading(false);
          }
        // }
      }

    useEffect(() => {
        fetchWshProducts();
    },[]);

    if(loading) return <LoaderMd/>


  return (
    <div className="container-fluid productContainer">
        <div className='container'>
            <div className="row">

                <div className="col-12 mb-4">
                    <Title title="❤ Wishlist" />
                </div>
                
                {
                    products.length > 0
                    ?
                    products.map((product, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                            <div className="card shadow">
                                <button className='wishlistBtn' onClick={() => removeWishlistProduct(product._id)}>
                                    &#10005;
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
                    <Message message="No product found in wishlist!" />
                }
                

            </div>
        </div>
    </div>
  )
}

export default Wishlist;