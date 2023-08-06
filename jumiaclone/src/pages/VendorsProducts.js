import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../layout/Footer';

import "./VendorsProducts.css";
import ProductsCarousel from './ProductsCarousel';

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

function VendorsProducts() {


  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const {id} = useParams();
  
  useEffect(() => {
      const vendorProducts = async () => {
        try {

          const userResponse = await axios.get('http://localhost:8080/api/users/user/me', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          setUser(userResponse.data);

          const response = await axios.get(`http://localhost:8080/api/products/vendor/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response.data)
          setProducts(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      vendorProducts();
    }, []);



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
  
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...response.data } : product
          )
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
    <div>
      <div className='container mt-4'>
      
        {/* <div  class="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div>
              <div className='single-product card'>
                <Link to={`/viewProduct/${product.id}`}>
                    <img className='product--image' src={product.productName} alt='product image' />
                </Link>
                <div>{product.percentageDiscount}</div>
                {product.amountDiscounted}
              </div>
                
            </div>
            
          </div>

          
          ))}
        </div> */}







        <CartNotification showCartNotification={showCartNotification} />
        <div className='product-grid'>
          
            {products.map((product) => (
              <div key={product.id} className='card'>
                <span className='discount'>- {product.percentageDiscount}%</span>
                <div>
                  <Link to={`/viewProduct/${product.id}`}>
                    <img className='product--image' src={product.imageUrl} alt='product image' />
                  </Link>
                </div>
                <h3 className='product-name'>{product.productName}</h3>
                <p className='price'>
                  #{product.sellingPrice}{' '}
                  <span className='original-prize'>
                    #{product.sellingPrice + product.amountDiscounted}
                  </span>
                </p>

                <button className='btn mx-2' onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        

      </div>
      <Footer />

    </div>
  )
}

export default VendorsProducts