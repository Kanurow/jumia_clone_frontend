import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { formatDateTime } from '../Helpers/DateTimeFormat';

import { Table } from 'react-bootstrap';
import Footer from '../layout/Footer';

function VendorsOrders() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState([]);

useEffect(() => {
        const fetchProduct = async () => {
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
            const response = await axios.get(`https://jumia-clone-bra6.onrender.com/api/products/vendors/productsOrdered/${userResponse.data.id}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                windows: 'true',
              },
            });
            setProduct(response.data);
          } catch (error) {
            setError(error.message);
          }
        };
    
    fetchProduct();
}, []);


  return (
    <div>

<div className="container mt-4">
      <h1 className="mb-4">Products Ordered</h1>
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>Order ID</th>
            <th>Full Name</th>
            <th>Receiver Phone Number</th>
            <th>Delivery Address</th>
            <th>Region, State</th>
            <th>Purchase Date & Time</th>
            <th>Cart Items : Price * Quantity = Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName} {item.lastName}</td>
              <td> {item.phoneNumber}</td>
              <td> {item.deliveryAddress}</td>
              <td> {item.region}, {item.state}</td>
              <td> {formatDateTime(item.purchaseDate)} </td>
              <td>
                {item.cart.map((cartItem) => (
                  <div key={cartItem.productId}>
                    <div> {cartItem.productName} : {cartItem.price} * {cartItem.quantity}  = {cartItem.subtotal} </div>
                    
                  </div>
                ))}
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
        
    <Footer />
    </div>
  )
}

export default VendorsOrders
