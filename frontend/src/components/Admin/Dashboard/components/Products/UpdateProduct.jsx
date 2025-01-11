import React, { useEffect, useRef, useState } from 'react';
import Title from '../Title/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import one from '../../../../assets/one.jpg'
import toast from 'react-hot-toast';

function UpdateProduct() {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const [p_title, setPTitle] = useState("");
  const [p_desc, setPDesc] = useState("");
  const [p_category, setPCategory] = useState("");
  const [p_brand, setPBrand] = useState("");
  const [p_qty, setPQty] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [fixed_price, setFixedPrice] = useState("");
  const [img1_path, setImg1Path] = useState("");
  const [img2_path, setImg2Path] = useState("");
  const [img3_path, setImg3Path] = useState("");
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const fetchCategoriesHandler = async () => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/fetchfordash`, {
        withCredentials : true
      });
      setAllCategories(response.data.categories);

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


  const fetchBrandsHandler = async () => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand/fetchfordash`, {
        withCredentials : true
      });
      setAllBrands(response.data.brands);

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

  // fetch product for update
  const fetchProductHandler = async () => {
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/productinform/${id}`,{
        withCredentials : true
      });
      setPTitle(response.data.product.p_title);
      setPDesc(response.data.product.p_desc);
      setPQty(response.data.product.p_qty);
      setOriginalPrice(response.data.product.original_price);
      setFixedPrice(response.data.product.fixed_price);
      setPBrand(response.data.product.p_brand);
      setPCategory(response.data.product.p_category);
      setImg1Path(response.data.product.img_path1);
      setImg2Path(response.data.product.img_path2);
      setImg3Path(response.data.product.img_path3);
    }
    catch(error)
    {
      console.log(error.response?.data.message || error.message);
    }
  }

  // update handler
  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const img1 = img1Ref.current.files[0] || "";
      const img2 = img2Ref.current.files[0] || "";
      const img3 = img3Ref.current.files[0] || "";
      const updateProObj = {p_title, p_desc, p_category, p_brand, p_qty, original_price, fixed_price, img1, img2, img3};
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/update/${id}`,updateProObj,{
        headers : {
          'Content-Type' : 'multipart/form-data',
        },
        withCredentials : true
      });
      toast.success(response.data.message)
      fetchProductHandler();
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductHandler();
    fetchCategoriesHandler();
    fetchBrandsHandler();
  },[id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Update Product" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={updateHandler}>
            <div className="mt-3">
              <label htmlFor="">Product Title</label>
              <input type="text" required onChange={e => setPTitle(e.target.value)} value={p_title} className='inputField' />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Description</label>
              <textarea required onChange={e => setPDesc(e.target.value)} value={p_desc} className='inputField' rows={6} />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Category</label>
              <select className='inputField' required onChange={e => setPCategory(e.target.value)} value={p_category}>
                {
                  allCategories.length > 0
                  ?
                  allCategories.map((category, index) => {
                    return <option key={index} value={category._id} selected={category._id == p_category ? true : false}>{category.c_name}</option>
                    })
                  :
                  <option value="" disabled>No categories found</option>
                }
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Brand</label>
              <select className='inputField' required onChange={e => setPBrand(e.target.value)} value={p_brand}>
                {
                  allCategories.length > 0
                  ?
                  allBrands.map((brand, index) => {
                    return <option key={index} value={brand._id} selected={brand._id == p_brand ? true : false}>{brand.b_name}</option>
                    })
                  :
                  <option value="" disabled>No brands found</option>
                }
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Quantity</label>
              <input type="text" required onChange={e => setPQty(e.target.value)} value={p_qty} className='inputField' />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Original Price/ ex : <s>1500</s></label>
              <input type="text" required onChange={e => setOriginalPrice(e.target.value)} value={original_price}  className='inputField' />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Regular Price/ ex : 1000</label>
              <input type="text" required onChange={e => setFixedPrice(e.target.value)} value={fixed_price} className='inputField' />
            </div>
            {/* file */}
            <img src={img1_path} alt="img" style={{height:'50px',width:'50px',borderRadius:'5px',marginTop:'10px'}} />
            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile1" className='file-upload-label'>
                Product Image 1
              </label>
              <input type="file" ref={img1Ref} id='myfile1' className='fileInput' />
            </div>

            <img src={img2_path} alt="img" style={{height:'50px',width:'50px',borderRadius:'5px',marginTop:'10px'}} />
            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile2" className='file-upload-label'>
                Product Image 2
              </label>
              <input type="file" ref={img2Ref} id='myfile2' className='fileInput' />
            </div>

            <img src={img3_path} alt="img" style={{height:'50px',width:'50px',borderRadius:'5px',marginTop:'10px'}} />
            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile3" className='file-upload-label'>
                Product Image 3
              </label>
              <input type="file" ref={img3Ref} id='myfile3' className='fileInput' />
            </div>
            {/* file */}
            <div className="mt-3">
              <button disabled={loading} type='submit' className='mdBtn'>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct;