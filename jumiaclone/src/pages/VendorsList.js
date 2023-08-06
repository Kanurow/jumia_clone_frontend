import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorsList.css';
import { Link } from 'react-router-dom';
import anonymous from "./JUMIA_VENDOR.png";

function VendorsList() {

    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const vendorsResponse = await axios.get('http://localhost:8080/api/users/getVendors', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                windows: 'true',
              },
            });
            setVendors(vendorsResponse.data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchData();
      }, []);
      console.log(vendors)


  return (
    <div>
      <div className="container mt-4">
        <div>

              <div class="vendors-grid">
              {vendors.map((vendor) => (
                <Link className='vendor-grid-display' to={`/viewVendor/${vendor.id}`}>
                <div  key={vendor.id}  class="vendor-preview">
                  
                {vendor.profilePictureUrl === "" ? (
                      <div class="thumbnail-row">
                        <img class="thumbnail" src={anonymous} alt="Profile Thumbnail 1" />
                      </div>
                    ) : (
                      <div class="thumbnail-row">
                        <img class="thumbnail" src={vendor.profilePictureUrl} alt="Profile Thumbnail 2" />
                      </div>
                    )}

                
                                                
                    
                    <div class="vendor-info-grid">
                    {vendor.companyLogoUrl === "" ? (

                        <div class="vendor-picture">
                            <img class="company-logo" src={anonymous} alt="Company Logo"></img>
                        </div>

                        ) : (
                          <div class="vendor-picture">
                            <img class="company-logo" src={vendor.companyLogoUrl} alt="Company Logo"></img>
                        </div>

                        )}

                        <div class="vendor-info">
                            <p class="vendor-name">Name: {vendor.lastName}  {vendor.firstName} | {vendor.mobile}</p>
                            <p class="vendor-company">Company Name: {vendor.vendorCompany}</p>
                            <p class="vendor-territory">Territory: {vendor.territory}</p>
                        </div>
                    </div>
                </div>
                </Link>
                ))}


              </div>
          




        </div>
        
      </div>


            {/* <div className="container mt-4">
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
    </div> */}
    </div>
  )
}

export default VendorsList