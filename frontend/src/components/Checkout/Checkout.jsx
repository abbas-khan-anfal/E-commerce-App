import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Title from '../Title/Title';
import axios from 'axios';
import Message from '../Not Found/Message';
import LoaderMd from '../Loaders/Loader-md';
import toast from 'react-hot-toast';

function Checkout() {

	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	// states for billing details fields
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [orderNote, setOrderNote] = useState("");

	const [paymentMethod, setPaymentMethod] = useState("");

    const fetchCartProducts = async () => {
        setLoading(true);
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/getcartitems`, {
            withCredentials : true
          });
          setProducts(response.data.products);
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

	// submit handler
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{
			// check if payment method selected
			if(paymentMethod === "")
			{
				toast.error("Please select payment method!");
				return;
			}
			// check if all form fields available
			if(lName == "" || fName == "" || city == "" || address1 == "" || state == "" || phone == "" || email == "" || zip == "")
			{
				toast.error("Fields required");
				return;
			}
	
			const billingDetailObj = { fName, lName, city, state, zip, phone, email, orderNote, address1, address2, paymentMethod }
	
			if(paymentMethod == "cod")
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/cod-order`, billingDetailObj, {
					headers : {
						'Content-Type' : 'application/json',
					},
					withCredentials : true
				});
				toast.success(response.data.message);
				setFName("");
				setLName("");
				setCity("");
				setState("");
				setZip("");
				setPhone("");
				setEmail("");
				setOrderNote("");
				setAddress1("");
				setAddress2("");
				setPaymentMethod("");
				navigate('/success');
				return;
			}
			else if(paymentMethod == "stripe")
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/stripe-order`, billingDetailObj, {
					headers : {
						'Content-Type' : 'application/json',
					},
					withCredentials : true
				});
				window.location.href = response.data.url
				return;
			}
			else
			{
				axios.error("Please select the correct payment method!");
				return;
			}
		}
		catch(error)
		{
			toast.error(error.response.data.message || error.message);
		}
		finally
		{
			setLoading(false);
		}
	}


	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		  });	
		  fetchCartProducts();  
	},[]);

	const subTotalOfCart = () => {
		// total price of the total cart items
		let total = 0;
		products.forEach((item) => {
			total = total + item.p_id.fixed_price * item.qty
		})
		setTotalPrice(total);
	}

	useEffect(() => {
		subTotalOfCart();
	},[products]);


	if(loading) return <LoaderMd />

  return (
    <>
    <div className="container checkout_div">
		<form className="row" onSubmit={submitHandler}>
			<div className="col-12">
				<p><NavLink to="/" className='linkBtn'><i className="fa-solid fa-house"></i> Home <i className="fa-solid fa-angle-right"></i></NavLink> Shopping cart</p>
			</div>


			<div className="col-lg-8 col-md-7 col-sm-12">
				<div className="row">

					<div className="col-12">
						<Title title="Billing Details" />
						<hr></hr>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-lg-6 col-md-12">
								<div className="mt-3">
									<label>First Name</label>
									<input type="text" className='inputField' required onChange={e => setFName(e.target.value)} value={fName} />
								</div>
							</div>
							<div className="col-lg-6 col-md-12">
								<div className="mt-3">
									<label>Last Name</label>
									<input type="text" className='inputField' required onChange={e => setLName(e.target.value)} value={lName} />
								</div>
							</div>

							<div className="col-12">
								<div className="mt-3">
									<label>Country</label>
									<select className='form-control' disabled>
										<option value="" selected>Pakistan</option>
									</select>
								</div>
							</div>

							<div className="col-12">
								<div className="mt-3">
									<label>Address</label>
									<input type="text" placeholder="Street Address" className='inputField' required onChange={e => setAddress1(e.target.value)} value={address1} />
								</div>
								<div className="mt-3">
									<input type="text" placeholder="Apartment, Building, etc (optional)" className='inputField' onChange={e => setAddress2(e.target.value)} value={address2} />
								</div>
							</div>

							<div className="col-12">
								<div className="mt-3">
									<label>City</label>
									<input type="text" className='inputField' required onChange={e => setCity(e.target.value)} value={city} />
								</div>
							</div>

							<div className="col-12">
								<div className="mt-3">
									<label>State</label>
									<input type="text" className='inputField' required onChange={e => setState(e.target.value)} value={state} />
								</div>
							</div>
							<div className="col-12">
								<div className="mt-3">
									<label>Postcode / ZIP</label>
									<input type="text" className='inputField' required onChange={e => setZip(e.target.value)} value={zip} />
								</div>
							</div>

							<div className="col-lg-6 col-md-12 col-sm-12">
								<div className="mt-3">
									<label>Phone</label>
									<input type="text" className='inputField' required onChange={e => setPhone(e.target.value)} value={phone} />
								</div>
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12">
								<div className="mt-3 mb-3">
									<label>Email</label>
									<input type="email" className='inputField' required onChange={e => setEmail(e.target.value)} value={email} />
								</div>
							</div>
							<hr></hr>

							<div className="col-12 mb-3">
								<div className="mt-3">
									<label>Order notes(Option)</label>
									<textarea rows={4} className='inputField' placeholder="Note about your order, e.g. special notes for delivery." onChange={e => setOrderNote(e.target.value)} value={orderNote}></textarea>
								</div>
							</div>
						</div>
					</div>
					

				</div>
			</div>


			<div className="col-lg-4 col-md-5 col-sm-12 checkout_details">
				<Title title="Your Order" />

				<hr></hr>
				<div className="row">
					<div className="col-6"><h6>Product</h6></div>
					<div className="col-6"><h6>Total</h6></div>
					{
						products.length > 0
						?
							products.map((product, index) => (
								<>
								<span>{index + 1})</span>
								<div className="col-6"><span className="p_title">{product.p_id.p_title.substring(0, 10)+"..."}</span></div>
								<div className="col-6"><span className="p_price">{product.p_id.fixed_price}$</span></div>
								</>
							))
						:
							<Message message="Data not found!" />
					}
				</div>
				<hr></hr>


				<div className="row">
					<div className="col-6"><h6>Subtotal</h6></div>
					<div className="col-6"><h6 className="total_price">{totalPrice}$</h6></div>
					<div className="col-6"><h6>Total</h6></div>
					<div className="col-6"><h6 className="total_price">{totalPrice}$</h6></div>
				</div>
				<hr></hr>


				<div className="row">
					<div className="col-12">
						<h6>Select Payment Method</h6>
					</div>
					<div className="col-12">
						<div>
							<input type="radio" name="PayMethod" id="myradio1" value="cod" onChange={() => setPaymentMethod("cod")} />
							<label for="myradio1">COD</label><br></br>
							<input type="radio" name="PayMethod" id="myradio2" value="stripe" onChange={() => setPaymentMethod("stripe")} />
							<label for="myradio2" >Stripe</label><br></br>
						</div>
					</div>
				</div>

				<div>
					<button disabled={loading} type='submit' className="lgBtn">PLACE ORDER</button>
				</div>

			</div>
		</form>
	</div>
    </>
  )
}

export default Checkout;