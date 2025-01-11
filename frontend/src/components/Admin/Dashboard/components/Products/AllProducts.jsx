import React, { useEffect, useState } from 'react';
import Title from '../Title/Title';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderMd from '../../../../Loaders/Loader-md';

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProductsHandler = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/fetchfordash?page=${page}`, {
        withCredentials : true
      });
      setProducts(response.data.products);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
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


  // delete category handler
  const deleteProductHandler = async (id) => {
    if(confirm("Do you really want to delete this Product?"))
    {
      setLoading(true);
        try 
        {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/delete/${id}`,
        {
          withCredentials: true
        }
        );
        console.log(response)
          toast.success(response.data.message)
          fetchProductsHandler(currentPage);
        } 
        catch(error)
        {
          console.error(error.response?.data.message || error.message);
        }
        finally
        {
          setLoading(false);
        }
    }
      
  }

  useEffect(() => {
    fetchProductsHandler(currentPage);
  },[currentPage]);

  const pageHandler = (page) => {
    if(page >= 1 && page <= totalPages)
    {
      setCurrentPage(page);
    }
  }
  
  return (
    <div className="container dashboardTable">
      <div className="row">
        <div className="col-12">
          <Title title="All Products" />
        </div>
        {
          loading
          ?
          <LoaderMd />
          :
          <>
        <div className="col-12 table-responsive-lg table-responsive-sm table-responsive-md">
          <table className='table table-light'>
            <thead>
              <tr>
                <th>Sr:no</th>
                <th>Title</th>
                <th>Original Price</th>
                <th>Fixed Price</th>
                <th>Qty</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length > 0
                ?
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 3}</td>
                    <td>{product.p_title}</td>
                    <td>{product.original_price}</td>
                    <td>{product.fixed_price}</td>
                    <td>{product.p_qty}</td>
                    <td><NavLink to={`/admin/updateproduct/${product._id}`} className='mdBtn green'><i className="fa-solid fa-square-pen"></i></NavLink></td>
                    <td><button onClick={() => deleteProductHandler(product._id)} className='mdBtn red'><i className="fa-solid fa-trash"></i></button></td> 
                  </tr>
                ))
                :
                <tr>
                  <th colSpan="6">No Products Found!</th>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <ul className="pagination">
              <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><a className="page-link" onClick={() => pageHandler(currentPage - 1)}>Previous</a></li>
              {
                [...Array(totalPages)].map((_,i) => (
                  <li className={`page-item ${currentPage == i + 1 ? 'active' : ''}`}><button className="page-link" onClick={() => pageHandler(i + 1)} >i</button></li>
                ))
              }
              <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><a className="page-link" onClick={() => pageHandler(currentPage + 1)}>Next</a></li>
          </ul>
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default AllProducts;