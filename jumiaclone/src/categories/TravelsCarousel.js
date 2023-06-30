import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../pages/ProductCarousel.css';

import axios from 'axios';

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

function TravelsCarousel() {
  const [error, setError] = useState(null);
  const [travels, setTravels] = useState([]);
  const [user, setUser] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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

        const productsResponse = await axios.get(
          'http://localhost:8080/api/products/travels',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          }
        );
        setTravels(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
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

      setTravels((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, ...response.data }; 
        }
        return product;
      })
    );

      setShowCartNotification(true);
      setTimeout(() => {
        setShowCartNotification(false);
      }, 6000);
    } catch (error) {
      setError('Cannot add a product twice. Please refresh the page.');
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <div className='all'>
        <CartNotification showCartNotification={showCartNotification} />

        <div className='product-title'>
          {travels.length === 0 && (
            <>
              Create Products To Enable Product Display. Products created under
              Travels category gets displayed here.
            </>
          )}
          {travels.length > 0 && <>Top Bookings and Outings</>}
        </div>

        <Carousel responsive={responsive}>
          {travels.map((item) => (
            <div key={item.id} className='card'>
              <span className='discount'>- {item.percentageDiscount}%</span>
              <img
                className='product--image'
                src={item.imageUrl}
                alt='product image'
              />
              <h3 className='product-name'>{item.productName}</h3>
              <p className='price'>
                #{item.sellingPrice}{' '}
                <span className='original-prize'>
                  #{item.sellingPrice + item.amountDiscounted}
                </span>
              </p>
              <button
                className='btn mx-2'
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default TravelsCarousel;
