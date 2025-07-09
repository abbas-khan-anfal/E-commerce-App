import React, { useState, useEffect, useContext, useRef} from 'react';
import './Cart.css';
import Title from '../Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';
import two from '../assets/one.jpg';
import axios from 'axios';
import LoaderMd from '../Loaders/Loader-md';
import Message from '../Not Found/Message';
import toast from 'react-hot-toast';
import siteContext from '../../context/Site Context/SiteContext';

function Cart() {
	const { totalCartProductsCount } = useContext(siteContext);
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

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

      const removeCartProduct = async (pid) => {
        // if(confirm("Do you really want to remove this product from cart?"))
		// {
			setLoading(true);
			try
			{
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/remove/${pid}`, {
				withCredentials : true
			});
				toast.error(response.data.message);
				fetchCartProducts();
				totalCartProductsCount();
			}
			catch(error)
			{
				toast.error(error.response?.data.message || error.message);
			}
			finally
			{
				setLoading(false);
			}
		// }
      }


	  const updateCartHandler = async (pid,qty) => {
        setLoading(true);
			try
			{
			const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/cart/updatecartitems/${pid}`,{qty : qty}, {
				withCredentials : true
			});
				toast.success(response.data.message);
			}
			catch(error)
			{
				toast.error(error.response?.data.message || error.message);
			}
			finally
			{
				setLoading(false);
				fetchCartProducts();
			}
      }

	const handleUpdateClick = (e) => {
		e.preventDefault();
		updateCartHandler(e.target.pid.value, Number(e.target.qty.value));
	};



    useEffect(() => {
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
	},[products])

    if(loading) return <LoaderMd/>



  return (
    <>
    <div className="container">
		<div className="row">
			<div className="col-lg-12 cart_menu_links">
				<Title title="Cart"/>
				<NavLink to="/" className='linkBtn'><i className="fa-solid fa-house"></i> Home</NavLink> / cart
			</div>
		</div>
	</div>


	{
		products.length > 0
		?
	<div className="container cart_page">
			<div className="row">
				<div className="col-12">
					<table className="table table-responsive product_table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Product</th>
								<th>Price</th>
								<th>Total Price</th>
								<th>Quantity</th>
								<th>Remove</th>
							</tr>
						</thead>

						<tbody>
						{
							products.map((product, index) => (
							<tr key={index}>
								<td><img src={product.p_id.img_path1} className="product_img"></img></td>
								<td><span>{product.p_id.p_title.substring(0,30)+"..."}</span></td>
								<td><span>${product.p_id.fixed_price}.00</span></td>
								<td><span>${product.p_id.fixed_price * product.qty}.00</span></td>
								<td>
								<form onSubmit={handleUpdateClick}>
								<input
									required
									type="number"
									min="1"
									max={product.p_id.p_qty}
									name='qty'
									className="qty"
									defaultValue={product.qty} // Use defaultValue for uncontrolled input
								/>
								<input type="hidden" name='pid' defaultValue={product.p_id._id}  />
								<button
									type='submit'
									className="mdBtn mx-2 px-2 py-1">
									<i className="fa-solid fa-pen-to-square"></i>
								</button>
								</form>
								</td>
								<td><span><button className="remove_btn" onClick={() => removeCartProduct(product.p_id._id)}>X</button></span></td>
							</tr>
								))
							}

						</tbody>

					</table>
				</div>

				<div className="col-lg-8 col-md-7 coupon_col">
					<NavLink to="/shop" className="continue_shopping_btn"><i className="fa-solid fa-angles-left"></i> CONTINUE SHOPPING</NavLink>
				</div>

				<div className="col-lg-4 col-md-5 total_col">
					<Title title="Cart Total" />
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td>Subtotal</td>
								<td>${totalPrice}.00</td>
							</tr>

							<tr>
								<td>Total</td>
								<td>${totalPrice}.00</td>
							</tr>

							<tr>
								<td colSpan={2}>
									<button className="lgBtn" onClick={() => navigate('/billing-details')}>PROCEED TO CHECKOUT</button>
								</td>
							</tr>

							<tr>
								<td colSpan={2} className="text-center">
									<span><i className="fa-solid fa-lock"></i> 100% secure payments</span>
								</td>
							</tr>

						</tbody>
					</table>
				</div>

			</div>
	</div>
	:
	<>
	<Message message="No product found in cart!" />
	<div className='my-3 text-center'>
		<NavLink to="/shop" className="mdBtn"><i className="fa-solid fa-angles-left"></i> CONTINUE SHOPPING</NavLink>
	</div>
	</>
	}
  </>
  )
}

export default Cart;