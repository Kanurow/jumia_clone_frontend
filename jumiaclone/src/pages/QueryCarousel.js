
import React, { useEffect, useMemo, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Querycarousel.css';

import axios from 'axios';

function CartNotification({ showCartNotification }) {
  return (
    <div
      id='querycart-notification' 
      style= {{ display: showCartNotification ? 'block' : 'none' }}
    >
      Product Added To Cart
    </div>
  );
}


function QueryCarousel({ query }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:8080/api/users/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setUser(response.data);

        const productsResponse = await axios.get('http://localhost:8080/api/products/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

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
      items: 8,
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
    {filteredProducts.length > 0 && (<div>

      <div className="queryall">
      <CartNotification showCartNotification={showCartNotification} />
        <div className="queryproduct-title">
          {filteredProducts.length > 0 && "Top Search Results"}
        </div>
        <Carousel responsive={responsive}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="query-card">
              <span className="query-discount">- {product.percentageDiscount}%</span>
              <img
                className="query-product--image"
                src={product.imageUrl}
                alt="product image"
              />
              <h3 className="query-product-name">{product.productName}</h3>
              <p className="price"> #{ product.sellingPrice}    <span className="original-prize"> #{ product.sellingPrice + product.amountDiscounted}</span></p>
              <button
                className="query-btn btn-primary btn-block"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ) 
          )}
        </Carousel>
      </div>

    </div>)}

    
    </>
  );
  
}

export default QueryCarousel;

