import React,{ useState, useEffect } from 'react';
import Title from '../Title/Title';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoaderMd from '../../../../Loaders/Loader-md';

function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchMessagesHandler = async (page) => {
    setLoading(true);
    try
    {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/message/fetch?page=${page}`, {
        withCredentials : true
      });
      setMessages(response.data.messages);
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
  const deleteMessageHandler = async (id) => {
    // if(confirm("Do you really want to delete this message?"))
    // {
      setLoading(true);
        try 
        {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/message/delete/${id}`,
        {
          withCredentials: true
        }
        );
          toast.success(response.data.message)
          fetchMessagesHandler(currentPage);
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
    fetchMessagesHandler(currentPage);
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
          <Title title="All Messages" />
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
                <th>Full Name</th>
                <th>Eamil</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {
                messages.length > 0
                ?
                messages.map((message, index) => {
                  return <tr key={index}>
                          <td>{index + 1 + (currentPage - 1) * 3}</td>
                          <td>{message.f_name}</td>
                          <td>{message.email}</td>
                          <td>{message.message}</td>
                          <td><button onClick={() => deleteMessageHandler(message._id)} className='mdBtn red'><i class="fa-solid fa-trash"></i></button></td> 
                        </tr>
                      })
                :
                <tr>
                  <td colSpan="4">No Message Found</td>
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

export default Messages;