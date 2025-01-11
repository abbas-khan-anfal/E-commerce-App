import { useContext, useEffect, useState } from "react";
import siteContext from "./SiteContext";
import axios from "axios";
import toast from "react-hot-toast";

const ContextProvider = ({ children }) => {

    // navbar states
    const [thirdNav, setThirdNav] = useState(false);
    const [secondNav, setSeconNav] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    // dashboard navbar toggle states
    const [dashNav, setDashNav] = useState(false);
    // state for checking admin authentication
    const [adminState, SetAdminState] = useState(false);
    // state for checking user authentication
    const [userState, SetUserState] = useState(false);
    // state for storing user profile
    const [userProfile, setUserProfile] = useState({});
    // wishlist items
    const [wishlistItems, setWishlistItems] = useState([]);
    // total items in wishlist (the count)
    const [wshCount, setWshCount] = useState(0);
    // total items in cart (the count)
    const [cartCount, setCartCount] = useState(0);
    // orders
    const [orders, setOrders] = useState([]);


      // function to check if admin login or not
      const adminStateHandler = async () => {
        try
        {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getadmin`, {
                withCredentials : true
            });
            SetAdminState(true);
            // console.clear();
        }
        catch(error)
        {
            SetAdminState(false);
            console.log(error.response?.data.message || error.message);
        }
    }

    // function to logout admin
    const logoutAdminHandler = async (e) => {
        e.preventDefault();
        try
        {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/logoutadmin`,{
            withCredentials : true
          });
          toast.success(response.data.message);
          SetAdminState(false);
        }
        catch(error)
        {
          toast.error(error.response?.data.message || error.message);
        }
      }

            // function to check if user login or not
            const userStateHandler = async () => {
                try
                {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getuser`, {
                        withCredentials : true
                    });
                    
                    SetUserState(true);
                    setUserProfile(response.data.user);
                    // console.clear();
                }
                catch(error)
                {
                    SetUserState(false);
                    console.log(error.response?.data.message || error.message);
                }
            }
        
            // function to logout user
            const logoutUserHandler = async (e) => {
                e.preventDefault();
                try
                {
                  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/logoutuser`,{
                    withCredentials : true
                  });
                  toast.success(response.data.message);
                  SetUserState(false);
                }
                catch(error)
                {
                  toast.error(error.response?.data.message || error.message);
                }
              }

    // function to add product in wishlist
    const addToWishlistHandler = async (pid) => {
      try
      {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/add/${pid}`, {
          withCredentials : true
        });
        response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)
        fetchAllWishlistProducts();
        totalWshProductsCount();
      }
      catch(error)
      {
        toast.error(error.response?.data.message || error.message);
      }
    }

    // function to add product in cart
    const addToCartHandler = async (pid,qty) => {
      try
      {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/add?pid=${pid}&qty=${qty}`, {
          withCredentials : true
        });
        toast.success(response.data.message);
        totalCartProductsCount();
      }
      catch(error)
      {
        toast.error(error.response?.data.message || error.message);
      }
    }

    // function to fetch all wishlist products
    const fetchAllWishlistProducts = async () => {
      try
      {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/getwshproducts`, {
          withCredentials : true
        });
        setWishlistItems(response.data.allProducts);
      }
      catch(error)
      {
        console.error(error.response?.data.message || error.message);
      }
    }

    // function to fetch total Products count in wishlist
    const totalWshProductsCount = async () => {
      try
      {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/wshprocounts`, {
          withCredentials : true
        });
        setWshCount(response.data.totalItems);
      }
      catch(error)
      {
        console.error(error.response?.data.message || error.message);
      }
    }

    // function to fetch total Products count in wishlist
    const totalCartProductsCount = async () => {
      try
      {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/cartprocounts`, {
          withCredentials : true
        });
        setCartCount(response.data.totalItems);
      }
      catch(error)
      {
        console.error(error.response?.data.message || error.message);
      }
    }

    // fetch orders for user
    const fetchUsersOrder = async () => {
      try
      {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/ordersforuser`, {
              withCredentials : true
          });
          setOrders(response.data.orders);
      }
      catch(error)
      {
          console.log(error.response?.data.message || error.message);
      }
  }

    return (
        <siteContext.Provider value={{ thirdNav, setThirdNav, secondNav, setSeconNav, dropDown, setDropDown, dashNav, setDashNav, adminState, SetAdminState, adminStateHandler, logoutAdminHandler, userStateHandler,logoutUserHandler, userState, SetUserState, userProfile, addToWishlistHandler, addToCartHandler, wishlistItems, fetchAllWishlistProducts, totalWshProductsCount, wshCount, totalCartProductsCount, cartCount, fetchUsersOrder, orders }}>
            {children}
        </siteContext.Provider>
    )
}

export default ContextProvider;