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

function BabyProductsCarouse() {
  const [error, setError] = useState(null);
  const [babyProducts, setBabyProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          'https://jumia-clone-bra6.onrender.com/api/users/user/me',
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
          'https://jumia-clone-bra6.onrender.com/api/products/babyProducts',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          }
        );
        setBabyProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `https://jumia-clone-bra6.onrender.com/api/products/addtocart/${productId}/${user.id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      setBabyProducts((prevProducts) =>
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
          {babyProducts.length === 0 && (
            <>
              Create Products To Enable Product Display. Products created under
              Baby Products category gets displayed here.
            </>
          )}
          {babyProducts.length > 0 && <>Top Deals</>}
        </div>

        <Carousel responsive={responsive}>
          {babyProducts.map((item) => (
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

export default BabyProductsCarouse;
