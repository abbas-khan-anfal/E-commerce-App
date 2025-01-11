import React, { useEffect, useState, useContext } from 'react';
import './ProDetail.css';
import Title from '../Title/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Message from '../Not Found/Message';
import LoaderMd from '../Loaders/Loader-md';
import siteContext from '../../context/Site Context/SiteContext';

function ProDetail() {
    const { addToCartHandler } = useContext(siteContext);
    const {id} = useParams();
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [src1, setSrc1] = useState("https://picsum.photos/id/240/200/300");
    const [src2, setSrc2] = useState("https://picsum.photos/id/250/200/300");
    const [src3, setSrc3] = useState("https://picsum.photos/id/260/200/300");

    // qty state
    const [qty, setQty] = useState(1);

    const [lgImgSrc, setLgImgSrc] = useState(""); // Set initial source to src1

    // fetch product handler
    const fetchProductHandler = async (pid) => {
        setLoading(true);
        try
        {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/productinform/${pid}`,{
                withCredentials : true
            });
            setProduct(response.data.product);
            setLgImgSrc(response.data.product.img_path1);
            setSrc1(response.data.product.img_path1);
            setSrc2(response.data.product.img_path2);
            setSrc3(response.data.product.img_path3);
            setPage(true);
        }
        catch(error)
        {
            console.log(error.response?.data.message || error.message);
        }
        finally
        {
            setLoading(false);
        }
    };

    // Set the initial image source for lgImg
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductHandler(id);
    }, [id]);

    const imagesHandler = (src) => {
        setLgImgSrc(src); // Update only the state
    }

    const qtyHandler = (e,button) => {
        e.preventDefault();
        if(button === "+")
        {
            setQty(qty + 1);
        }
        else
        {
            setQty(qty - 1);
        }
    }

    if(loading) return <LoaderMd />


    if(!page) return <Message message="Product not found,url id incorrect" />
  return (
    <div className="container-fluid productDetailPage">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
                    <div className='lgImgDiv'>
                        {/* Use lgImgSrc state directly */}
                        <img className='lgImg' src={lgImgSrc} alt="Image" />
                    </div>
                    <div>
                        <img className={`smImg ${lgImgSrc === src1 ? 'active' : ''}`} src={src1} onClick={() => imagesHandler(src1)} alt="Thumbnail 1" />
                        <img className={`smImg ${lgImgSrc === src2 ? 'active' : ''}`} src={src2} onClick={() => imagesHandler(src2)} alt="Thumbnail 2" />
                        <img className={`smImg ${lgImgSrc === src3 ? 'active' : ''}`} src={src3} onClick={() => imagesHandler(src3)} alt="Thumbnail 3" />
                    </div>
                </div>

                {
                    product && Object.keys(product).length > 0
                    ?
                <div className="col-lg-5 col-md-6 col-sm-12 detailSection">
                    <p><a href="" className='linkBtn'><i className="fa-solid fa-house"></i> Home </a>/ {product.p_title}</p>
                    <h3 className='productTitle'>{product.p_desc.substring(0,40) + "..."}</h3>
                    <h4>Price : <s>1500</s> 1000</h4>
                    <h6>Qty : Total {product.p_qty} qty available</h6>
                    <form action="">
                        <button onClick={(e) => qtyHandler(e,"+")} className='leftBtn'>+</button>
                        <input type="number" value={qty} disabled />
                        <button onClick={(e) => qtyHandler(e,"-")} className='rightBtn' disabled={qty == 1 ? true : false}>-</button>
                    </form>
                    <button className='lgBtn mb-2' disabled={ qty > product.p_qty ? true : false } onClick={() => addToCartHandler(product._id, qty)}>Add To Cart</button>
                </div>
                :
                <Message message="Product not found"/>
                }
            </div>
            <hr />

            {/* product description row */}
            <div className="row">
                {
                    product && Object.keys(product).length > 0
                    ?
                <div className="col-10 productDescr">
                    <Title title={product.p_title}/>
                    <p>{product.p_desc}</p>
                    <Title title="Price"/>
                    <span>{product.fixed_price} final price</span>
                    <Title title="Quantity"/>
                    <span>{product.p_qty}</span>
                </div>
                :
                <Message message="Product details not found"/>
                }
            </div>
        </div>
    </div>
  )
}

export default ProDetail;
