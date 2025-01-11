import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderMd from '../../../../Loaders/Loader-md';

function AllBrand() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBrandsHandler = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand/fetchfordash?page=${page}`, {
        withCredentials : true
      });
      setBrands(response.data.brands);
      setCurrentPage(page);
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

  // delete brand handler
  const deleteBrandHandler = async (id) => {
    if(confirm("Do you really want to delete this brand?"))
    {
        setLoading(true);
        try 
        {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/brand/delete/${id}`,
        {
          withCredentials: true
        }
        );
          toast.success(response.data.message);
          fetchBrandsHandler(currentPage);
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
    fetchBrandsHandler(currentPage);
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
          <Title title="All Brands" />
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
                <th>Brand Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                brands.length > 0
                ?
                brands.map((brand, index) => {
                  return <tr>
                          <td>{index + 1}</td>
                          <td>{brand.b_name}</td>
                          <td><NavLink to={`/admin/updatebrand/${brand._id}`}  className='mdBtn green'><i class="fa-solid fa-square-pen"></i></NavLink></td>
                          <td><button onClick={() => deleteBrandHandler(brand._id)} className='mdBtn red'><i class="fa-solid fa-trash"></i></button></td> 
                        </tr>
                      })
                :
                <tr>
                  <td colSpan="4">No Brands Found</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <ul class="pagination">
              <li class={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><button class="page-link" onClick={() => pageHandler(currentPage - 1)}>Previous</button></li>
              {
                [...Array(totalPages)].map((_,i) => (
                  <li key={i} class={`page-item ${currentPage == i + 1 ? 'active' : ''}`}><button class="page-link" onClick={() => pageHandler(i + 1)}>{i + 1}</button></li>
                ))
              }
              <li class={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><button class="page-link" onClick={() => pageHandler(currentPage + 1)}>Next</button></li>
          </ul>
        </div>
        </>
        }

      </div>
    </div>
  )
}

export default AllBrand;