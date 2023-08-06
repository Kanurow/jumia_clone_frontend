import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Footer from '../layout/Footer';

export default function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      try {
        fetchUserOrders(user.id); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/orderHistory/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Order History</h1>
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>Order ID</th>
            <th>Full Name</th>
            <th>Receiver Phone Number</th>
            <th>Delivery Address</th>
            <th>Region, State</th>
            <th>Cart Items : Price * Quantity = Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.firstName} {order.lastName}</td>
              <td> {order.phoneNumber}</td>
              <td> {order.deliveryAddress}</td>
              <td> {order.region}, {order.state}</td>
              <td>
                {order.cart.map((item) => (
                  <div key={item.productId}>
                    <div> {item.productName} : {item.price} * {item.quantity}  = {item.subtotal} </div>
                    
                  </div>
                ))}
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
}
