import React,{ useState, useEffect } from 'react';
import Title from '../Title/Title';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderMd from '../../../../Loaders/Loader-md';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchUsers = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/fetchusersfordash?page=${page}`, {
        withCredentials : true
      });
      setUsers(response.data.users);
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
  const deleteUserHandler = async (id) => {
    // if(confirm("Do you really want to delete this user?"))
    // {
      setLoading(true);
        try 
        {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/deleteuser/${id}`,
        {
          withCredentials: true
        }
        );
          toast.success(response.data.message)
          fetchUsers(currentPage);
        } 
        catch(error)
        {
          console.error(error.response?.data.message || error.message);
        }
        finally
        {
          setLoading(false);
        }
    // }
      
  }


  useEffect(() => {
    fetchUsers(currentPage);
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
          <Title title="All Users" />
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
                <th>Username</th>
                <th>Eamil</th>
                <th>Join Date</th>
                <th>items Purchases</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {
                users.length > 0
                ?
                users.map((user, index) => {
                  return <tr key={index}>
                          <td>{index + 1 + (currentPage - 1) * 3}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.join_date}</td>
                          <td>{user.items_purchases || 0}</td>
                          <td><button onClick={() => deleteUserHandler(user._id)} className='mdBtn red'><i class="fa-solid fa-trash"></i></button></td> 
                        </tr>
                      })
                :
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <ul class="pagination">
              <li class={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><button onClick={() => pageHandler(currentPage - 1)} class="page-link">Previous</button></li>
              {
                [...Array(totalPages)].map((_,i) => (
                  <li key={i} className={`page-item ${currentPage == i + 1 ? 'active' : ''}`}><button className='page-link' onClick={() => pageHandler(i + 1)}>{i + 1}</button></li>
                ))
              }
              <li class={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><button onClick={() => pageHandler(currentPage + 1)} class="page-link">Next</button></li>
          </ul>
        </div>
        </>
      }
      </div>
    </div>
  )
}

export default Users;