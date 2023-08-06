import React, { useEffect, useState } from 'react';
import { AiFillAndroid, AiFillApi, AiFillAppstore } from 'react-icons/ai';
import {
  BsBookHalf,
  BsBusFront,
  BsFileMedical,
  BsFillBuildingsFill,
  BsFillTicketPerforatedFill,
  BsPcDisplay,
} from 'react-icons/bs';
import './Home.css';
import ImageSlider from '../components/ImageSlider';
import ProductsCarousel from './ProductsCarousel';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { BiUserCheck } from 'react-icons/bi';

export default function Home({ allProducts }) {




  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [sortBy, setSortBy] = useState('productName');

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/api/users/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setUser(userResponse.data);

        const productsResponse = await axios.get(
          `http://localhost:8080/api/products/paged/${offset}/${pageSize}/${sortBy}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          }
        );
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [offset, pageSize, sortBy]);

  const handlePageClick = (data) => {
    setOffset(data.selected);
  };

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
    <>
      <div className='body'>
        <div className='main-section'>
          <div className='sidebar'>
          <Link className='sidebar-link' to='/allVendors'>
              <div className='sidebar-react-icon'>
                <BiUserCheck size={20} />
              </div>
              <div className='sidebar-text'>Select Your Favourite Vendor</div>
            </Link>
            <Link className='sidebar-link' to='/supermarket'>
              <div className='sidebar-react-icon'>
                <BsFillBuildingsFill size={20} />
              </div>
              <div className='sidebar-text'>Supermarket</div>
            </Link>
                  <Link className='sidebar-link' to={"/travels"}>
                     <div className='sidebar-react-icon'><BsBusFront size={20} /></div>
                     <div className='sidebar-text'>Travels</div>
                  </Link>

                   <Link className='sidebar-link' to={"/computing"}>
                       <div className='sidebar-react-icon'><BsPcDisplay size={20} /></div>
                       <div className='sidebar-text'>Computing</div>
                   </Link>

                   <Link className='sidebar-link' to={"/phonesAndTablets"}>
                       <div className='sidebar-react-icon'><AiFillAndroid size={20} /></div>
                       <div className='sidebar-text'>Phones & Tablets</div>
                   </Link>

                  <Link className='sidebar-link' to={"/electronics"}>
                       <div className='sidebar-react-icon'><BsFillTicketPerforatedFill size={20} /></div>
                       <div className='sidebar-text'>Electronics</div>
                   </Link>

                   <Link className='sidebar-link' to={"/books"}>
                       <div className='sidebar-react-icon'><BsBookHalf  size={20} /></div>
                       <div className='sidebar-text'>Books</div>
                   </Link>

                  
                   <Link className='sidebar-link' to={"/babyProducts"}>
                       <div className='sidebar-react-icon'><BsFileMedical size={20} /></div>
                       <div className='sidebar-text'>Baby Products</div>
                   </Link>

                   <Link className='sidebar-link' to={"/appliances"}>
                       <div className='sidebar-react-icon'><AiFillAppstore size={20} /></div>
                       <div className='sidebar-text'>Appliances</div>
                   </Link>

                   <Link className='sidebar-link' to={"/others"}>
                       <div className='sidebar-react-icon'><AiFillApi size={20} /></div>
                       <div className='sidebar-text'>Others</div>
                   </Link>
            
            
          </div>
          <div className='image-slider-section'>
            <ImageSlider />
          </div>
        </div>

        <div className='products-display'>
          <ProductsCarousel />
        </div>

        <div className='product-grid-container container'>
          <div className='product-grid-header'>
            <div className='product-grid-header-left'>In the meantime shop our best offers</div>
            <div className='mb-3 product-grid-header-right'>
              <div className='selected-items'>
                <select
                  className='form-control'
                  name='pageSize'
                  value={pageSize}
                  onChange={(e) => setPageSize(parseInt(e.target.value))}
                >
                  <option value={6}>Quantity Per Page: 6</option>
                  <option value={9}>Quantity Per Page: 9</option>
                  <option value={12}>Quantity Per Page: 12</option>
                </select>

                <select
                  className='form-control'
                  name='sortBy'
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value='productName'>Sort By: Product Name</option>
                  <option value='sellingPrice'>Sort By: Price</option>
                  <option value='category'>Sort By: Category</option>
                </select>
              </div>
            </div>
          </div>
          <hr />

          <div className='product-grid-product-count'>{allProducts.length} products found</div>

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

          <ReactPaginate
            previousLabel='<<'
            nextLabel='>>'
            breakLabel='...'
            pageCount={Math.ceil(allProducts.length / pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName='pagination justify-content-center'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            activeClassName='active'
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
