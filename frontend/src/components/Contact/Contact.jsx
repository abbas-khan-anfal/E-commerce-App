import React, { useState } from 'react';
import './Contact.css';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import axios from 'axios';
import Message from '../Not Found/Message';

function Contact() {
    const [f_name, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(false);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try
        {
            const messageObj = {f_name, email, message}
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/message/add`,messageObj, {
                headers : {
                    'Content-Type': 'application/json',
                },
                withCredentials : true
            });
            toast.success(response.data.message)
            setFName("");
            setEmail("");
            setMessage("");
            setPage(true);
        }
        catch(error)
        {
            toast.error(error.response?.data?.message || error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

  return (
    <div className='container-fluid contactSection'>
        <div className='container'>
            <div className='row justify-content-between'>
                <div className='col-lg-5 col-sm-12 col-md-7'>
                <Title title="Contact Us" />
                {
                    !page
                    ?
                    <form className='mt-4' onSubmit={formSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="">Full Name</label>
                            <input type="text" required className='inputField' placeholder='Enter full name' onChange={e => setFName(e.target.value)} value={f_name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Email</label>
                            <input type="email" required className='inputField' placeholder='Enter email' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Message</label>
                            <textarea required className='inputField' rows={6} placeholder='Enter message...' onChange={e => setMessage(e.target.value)} value={message}></textarea>
                        </div>
                        <div className="mb-3">
                            <button type='submit' className='lgBtn text-center' disabled={loading}>
                                Send message
                            </button>
                        </div>
                    </form>
                    :
                    <Message message="Thanks for your message, Our team will be in touch with you shortly!" />
                }
                </div>
                
                <div className='col-lg-5 col-sm-12 col-md-5'>
                    <Title title="Find Us On Google Map" />
                    <div className='mt-4'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425289.990533232!2d72.75643905071773!3d33.61625093699602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729427679975!5m2!1sen!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Contact;