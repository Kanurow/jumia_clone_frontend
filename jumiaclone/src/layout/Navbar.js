import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import "./Navbar.css";
import logo from '../jumia_logo.png';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi'
import QueryCarousel from '../pages/QueryCarousel';




export default function Navbar() {

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');

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
        console.log(user)
        fetchUserShoppingCart(response.data.id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);
  let isUserAdmin;
  if (user.role == "[Role(id=2, name=ROLE_ADMIN)]") {
    isUserAdmin = true;
  } else {
    isUserAdmin = false;
  }
  

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
      }));

      setCart(cartWithData);
    } catch (error) {
      setError(error.message);
    }
  };






  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img className="logo-image" src={logo} alt="Logo" /> 
        </Link>

          <div className="d-flex justify-content-center align-items-center with-tooltip" data-tooltip="Please fill out this form">
          <form className="d-flex ">

              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-light searchbtn " type="submit">Search</button>
            </form>
          </div>

          <div className='top-right'>
            <div className='bold'> Welcome {user.username != null  && user.username}</div>

            <div className='icons'>
                <div>  <AiOutlineUser size={30} /></div>
                <div>
                    <NavDropdown title="Account" id="basic-nav-dropdown">

                   {isUserAdmin == true &&  <NavDropdown.Item className='dropdown-item' as={Link} to="/createProduct">Create Product</NavDropdown.Item> }
                    <NavDropdown.Item className='dropdown-item' as={Link} to="/orderHistory">View My Order History</NavDropdown.Item>
                    <NavDropdown.Item className='signin dropdown-item' as={Link} to="/register">Register User/Sign In</NavDropdown.Item>
                   {isUserAdmin == true && <NavDropdown.Item className='dropdown-item' as={Link} to="/vendorsOrders">View Products Orders By Buyers</NavDropdown.Item> }
                    <NavDropdown.Item className='dropdown-item' as={Link} to={`/edituser/${user.id}`} >Edit Profile</NavDropdown.Item>

                    </NavDropdown>
                </div>
            </div>

            <div className='icons'>
                <div><BiHelpCircle size={30} /></div>
                <div className='icons-text'>
                    <NavDropdown title="Help" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/about">About Web Application</NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to="/myProfile">Meet Rowland</NavDropdown.Item> */}
                    </NavDropdown>
                </div>

            </div>

            <div className='icons'>
                <Link className='cart-tooltip' to={"/cart"}><AiOutlineShoppingCart size={30} />
                  <span className='cart-tooltip-value'>{cart.length > 0 && cart.length}</span>
                </Link>
                <Link className='icons-text' to={"/cart"}>Cart</Link>

            </div>



          </div>

        </div>
      </nav>
      <QueryCarousel query={query} />
    </div>
  );
}
