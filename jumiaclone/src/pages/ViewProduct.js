import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineUser, AiOutlineShoppingCart, AiFillFacebook, AiFillTwitterCircle } from 'react-icons/ai';
import "./ViewProduct.css"
import Footer from '../layout/Footer'


function CartNotification({ showCartNotification }) {
    return (
      <div
        id='cart-notification' 
        style= {{ display: showCartNotification ? 'block' : 'none' }}
      >
        Product Added To Cart
      </div>
    );
  }

export default function ViewProduct() {
    const [error, setError] = useState(null);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState({})
    const [showCartNotification, setShowCartNotification] = useState(false);

    const {id} = useParams()
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const userResponse = await axios.get(
                'http://localhost:8080/api/users/user/me',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    windows: 'true',
                  },
                }
              );
              setUser(userResponse.data);


            const response = await axios.get(`http://localhost:8080/api/products/view/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                windows: 'true',
              },
            });
            console.log(response.data)
            setProduct(response.data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchProduct();
      }, []);
      console.log(user.id)

      const addToCart = async (productId) => {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/products/addtocart/${productId}/${user.id}`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                windows: 'true',
              },
            }
          );
    
    
          setShowCartNotification(true);
          setTimeout(() => {
            setShowCartNotification(false);
          }, 6000);
        } catch (error) {
          setError('Cannot add a product twice. Please refresh the page.');
        }
      };


    return (

        <>
        <CartNotification showCartNotification={showCartNotification} />
        
        <div className='container'>
            
            <div className='product-profile'>
            

                <div className='img-section'>
                    <img className='product-profile-image' src={product.imageUrl}></img>
                    <div className='share'>SHARE THIS PRODUCT</div>
                    <div className='icon' ><AiFillFacebook size={30} />  <AiFillTwitterCircle size={30} /> </div>
                </div>
                <div>
                    <div className='top-info'>
                        <div className='top-text'>OFFICIAL STORE</div>
                        <div className='top-discount'> - {product.percentageDiscount} </div>
                    </div>
                    <div className='p-name'>{product.productName}</div>
                    <div className='p-description'>{product.description}</div>
                    <div className='p-category'> CATEGORY: {product.category}</div>
                    <div className='p-price'> PRICE: #{product.sellingPrice} <span className='p-discount'>#{product.sellingPrice + product.amountDiscounted}</span></div>
                    <div className='p-qty'>QUANTITY IN STOCK: {product.quantity}</div>
                    <button 
                    className='add-to-cart'
                    onClick={() => addToCart(product.id)}
                    > <AiOutlineShoppingCart size={30}  className='cart' /> ADD TO CART</button>

                </div>

            </div>





            <Footer />
        </div>
        </>
        
    )
}
