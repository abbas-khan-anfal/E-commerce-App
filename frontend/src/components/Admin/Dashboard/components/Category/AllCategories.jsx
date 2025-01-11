import React,{ useState, useEffect } from 'react';
import Title from '../Title/Title';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderMd from '../../../../Loaders/Loader-md';

function AllCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchCategoriesHandler = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/fetchfordash?page=${page}`, {
        withCredentials : true
      });
      setCategories(response.data.categories);
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
  const deleteCategoryHandler = async (id) => {
    if(confirm("Do you really want to delete this category?"))
    {
      setLoading(true);
        try 
        {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/delete/${id}`,
        {
          withCredentials: true
        }
        );
          toast.success(response.data.message)
          fetchCategoriesHandler(currentPage);
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
    fetchCategoriesHandler(currentPage);
  },[currentPage]);

  const pageHandler = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  


  return (
    <div className="container dashboardTable">
      <div className="row">
        <div className="col-12">
          <Title title="All Categories" />
        </div>

        {
          loading
          ?
          <LoaderMd/>
          :
        <>
        <div className="col-12 table-responsive-lg table-responsive-sm table-responsive-md">
          <table className='table table-light'>
            <thead>
              <tr>
                <th>Sr:no</th>
                <th>Category Name</th>
                <th>Total Products</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {
                categories.length > 0
                ?
                categories.map((category, index) => {
                  return <tr>
                          <td>{index + 1 + (currentPage - 1) * 3}</td>
                          <td>{category.c_name}</td>
                          <th>{category.total_products}</th>
                          <td><NavLink to={`/admin/updatecategory/${category._id}`} className='mdBtn green'><i class="fa-solid fa-square-pen"></i></NavLink></td>
                          <td><button onClick={() => deleteCategoryHandler(category._id)} className='mdBtn red'><i class="fa-solid fa-trash"></i></button></td> 
                        </tr>
                      })
                :
                <tr>
                  <td colSpan="4">No Category Found</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <ul class="pagination">
              <li class={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><a onClick={() => pageHandler(currentPage - 1)} class="page-link" href="#">Previous</a></li>
              {
                [...Array(totalPages)].map((_,i) => (
                  <li key={i} className={`page-item ${currentPage == i + 1 ? 'active' : ''}`}><button className='page-link' onClick={() => pageHandler(i + 1)}>{i + 1}</button></li>
                ))
              }
              <li class={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><a onClick={() => pageHandler(currentPage + 1)} class="page-link" href="#">Next</a></li>
          </ul>
        </div>
        </>
      }
      </div>
    </div>
  )
}

export default AllCategories;