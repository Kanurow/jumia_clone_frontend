import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import "./ShoppingCart.css"
import { AiFillDelete,  AiOutlineDelete } from 'react-icons/ai';
import { BiMessage, BiMessageAltDots } from 'react-icons/bi';
import { BsRocketTakeoff } from 'react-icons/bs';
import Footer from '../layout/Footer';

function ShoppingCart() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setUser(response.data);
        fetchUserShoppingCart(response.data.id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserShoppingCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/cart/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      const cartWithData = response.data.map((cart) => ({
        ...cart,
        quantity: 1, 
      }));

      setCart(cartWithData);
      console.log(cartWithData);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeItem = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:8080/api/products/removefromcart/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error); 
      setError(error.message);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const maxQuantity = cart[index].product.quantity;
    if (newQuantity < 0) {
      return;
    }
    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.sellingPrice * item.quantity;
    });
    return total;
  };

  if (error) {
    return <div> {`Error: ${error}`}</div>;
  }

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <>
    <div className='cont'>
        <div className='container1'>
                <div className="shopping-cart container">
                <h5 className='cart-length'>Cart (<span>{cart.length}</span>)</h5>
                <hr/>

                {cart.map((item, index) => (

                <div className='product-details'>
                    <div className='product-img-setion'>
                        <img className='product-img' 
                        src={item.product.imageUrl} 
                        alt='product-px'></img>
                        <button className='remove-btn'
                        onClick={() => removeItem(item.id)}
                        > 
                            <AiOutlineDelete className='del-icon' size={15}/> 
                            REMOVE
                        </button>
                    </div>


                    <div className='product-info'>
                        <div className='prod-name'>{item.product.productName} </div>
                        <div className='prod-qty'>{item.product.quantity} units</div>
                        <div className='jumia-express'><span className='jumia'>JUMIA</span> <BsRocketTakeoff size={12} /> <span className='express'>EXPRESS</span></div>
                    </div>

                    <div>
                        <p className='original-price'>{item.product.sellingPrice}</p>
                        <div className='prev-price'> <span className='prev-price-sum'>{item.product.sellingPrice + item.product.amountDiscounted}</span> <span className='prev-price-discount'>-{item.product.percentageDiscount}%</span></div>
                        <input
                                type="number"
                                className="quantity-input"
                                min="1"
                                max={item.product.quantity}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                            />
                    </div>
                    <hr className='hr'/>

                </div>
                
                
                
                ))}
                
                
            </div>
            
            

        </div>

        <div className='container2'>
            <div className='cart-summary container'>
                    <div className='cart-summary-title'>Cart Summary</div> <hr></hr>
                    <div className='cart-summary-subtotal'>Subtotal <span className='amount'># {calculateTotal()} </span></div>
                    <div className='cart-summary-note'>Delivery fees not included yet</div>
                    <button className='checkout-btn' onClick={handleCheckout}>Checkout  <span className='amount'> # {calculateTotal()}</span></button>
            </div>
            <div className='container below-cart-summary'>
                <div className='header-text'>Returns Are Easy</div>
                <div className='note'>Free returns within 15 days for Official Store items and 7 days for other eligible items.</div>
            </div>

        </div>



    </div>

    <Footer />

    </>
  );
}

export default ShoppingCart;

