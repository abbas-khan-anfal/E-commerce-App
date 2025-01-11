import React, { useEffect, useRef, useState } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const file1Ref = useRef(null);
  const file2Ref = useRef(null);
  const file3Ref = useRef(null);

  const [p_title, setPTitle] = useState("");
  const [p_desc, setPDesc] = useState("");
  const [p_category, setPCategory] = useState("");
  const [p_brand, setPBrand] = useState("");
  const [p_qty, setPQty] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [fixed_price, setFixedPrice] = useState("");

  const fetchCategoriesHandler = async () => {
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


  const fetchBrandsHandler = async () => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand/fetchfordash`, {
        withCredentials : true
      });
      setBrands(response.data.brands);

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


  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      // Access files using refs
      const file1 = file1Ref.current.files[0];
      const file2 = file2Ref.current.files[0];
      const file3 = file3Ref.current.files[0];

      // files check
      if(!file1 || !file2 || !file3)
      {
        toast.error("Please select all files");
        setLoading(false);
        return;
      }

      // Create form data for submission
      const formData = new FormData();
      formData.append('p_title', p_title);
      formData.append('p_desc', p_desc);
      formData.append('p_category', p_category);
      formData.append('p_brand', p_brand);
      formData.append('p_qty', p_qty);
      formData.append('original_price', original_price);
      formData.append('fixed_price', fixed_price);

      // Append files
      formData.append('img1', file1);
      formData.append('img2', file2);
      formData.append('img3', file3);


      // api call
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/add`, formData,{
        headers : {
          'Content-Type' : 'multipart/form-data',
        },
        withCredentials : true
      });
      toast.success(response.data.message);
      // empty all fields
      setPTitle("");
      setPDesc("");
      setPCategory("");
      setPBrand("");
      setPQty("");
      setOriginalPrice("");
      setFixedPrice("");
      file1Ref.current.value = "";
      file2Ref.current.value = "";
      file3Ref.current.value = "";
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
    fetchCategoriesHandler();
    fetchBrandsHandler();
  },[]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Add New Product" />
        </div>
        <div className="col-lg-10 col-md-11 col-sm-12">
          <form action="" onSubmit={formSubmitHandler}>
            <div className="mt-3">
              <label htmlFor="">Product Title</label>
              <input type="text" onChange={e => setPTitle(e.target.value)} value={p_title} className='inputField' required/>
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Description</label>
              <textarea onChange={e => setPDesc(e.target.value)} value={p_desc} className='inputField' required rows={6} />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Category</label>
              <select className='inputField' required onChange={e => setPCategory(e.target.value)} value={p_category}>
              <option selected disabled value="">Select Category</option>
                {
                  categories.length > 0
                  ?
                  categories.map((category, index) => (
                    <option key={index} value={category._id}>{category.c_name}</option>
                  ))
                  :
                  <option value="">No categories found</option>
                }
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Brand</label>
              <select className='inputField' required onChange={e => setPBrand(e.target.value)} value={p_brand}>
              <option selected disabled value="">Selecect Brand</option>
                {
                  brands.length > 0
                  ?
                  brands.map((brand, index) => (
                    <option key={index} value={brand._id}>{brand.b_name}</option>
                  ))
                  :
                  <option value="">No brands found</option>
                }
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Quantity</label>
              <input type="text" onChange={e => setPQty(e.target.value)} value={p_qty} className='inputField' required />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Original Price/ ex : <s>1500</s></label>
              <input type="text" onChange={e => setOriginalPrice(e.target.value)} value={original_price} className='inputField' required />
            </div>
            <div className="mt-3">
              <label htmlFor="">Product Regular Price/ ex : 1000</label>
              <input type="text" onChange={e => setFixedPrice(e.target.value)} value={fixed_price} className='inputField' required />
            </div>
            {/* file */}
            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile1" className='file-upload-label'>
                Product Image 1
              </label>
              <input type="file" id='myfile1' ref={file1Ref} name='img1' className='fileInput' />
            </div>

            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile2" className='file-upload-label'>
                Product Image 2
              </label>
              <input type="file" id='myfile2' ref={file2Ref} name='img2' className='fileInput' />
            </div>

            <div className='file-upload-area mt-3'>
              <label htmlFor="myfile3" className='file-upload-label'>
                Product Image 3
              </label>
              <input type="file" name='img3' ref={file3Ref} id='myfile3' className='fileInput' />
            </div>
            {/* file */}
            <div className="mt-3">
              <button type='submit' disabled={loading} className='mdBtn'>Save Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;