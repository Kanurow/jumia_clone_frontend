import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import "./Checkout.css"
import storeAd from '../components/imgs/official-stores.gif';
import {  BiCheckCircle } from 'react-icons/bi';
import { BsFillTruckFrontFill } from 'react-icons/bs';
import Footer from '../layout/Footer';
import PaystackPop from "@paystack/inline-js";

function Checkout({ user }) {
  const location = useLocation();
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');

  const [paystackResponse, setPaystackResponse] = useState('');
  const [paystackApproved, setPaystackApproved] = useState('');
  const [paystackReference, setPaystackReference] = useState('');

  const navigate = useNavigate();

  const { cart } = location.state;


  const postResponseToDB = async (transaction) => {
    try {
      setPaystackApproved(transaction.message);
      setPaystackReference(transaction.reference)
      const quantity = cart.length;
      console.log(paystackApproved)
      console.log(paystackReference)

      const cartData = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.productName,
        price: item.product.sellingPrice,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
        subtotal: item.quantity * item.product.sellingPrice,
      }));

      const response = await axios.post(
        `http://localhost:8080/api/products/checkout/${user.id}`,
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          alternativePhoneNumber: alternativePhoneNumber,
          deliveryAddress: deliveryAddress,
          additionalInformation: additionalInformation,
          region: region,
          state: state,
          deliveryEmail : deliveryEmail,
          paystackApproved: transaction.message,
          paystackReference: paystackReference,

          total: calculateTotal(),
          quantity: quantity,
          userId: user.id,

          paystackApproved: transaction.message,
          paystackReference: transaction.reference,

          cart: cartData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      console.log(response.data);
      navigate('/orderHistory');


    } catch (error) {
      setError(error.message);
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    submitCart();
  };


  const submitCart = async () => {
    if (cart.length <= 0) {
      return;
    }
    try {
      const total = calculateTotal();
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_test_b5bb43e215fd5efc4f9a19e5fb2f4a01469550ca",
        amount:  total * 100,
        email: deliveryEmail,
        firstName: firstName,
        lastName: lastName,
        onSuccess(transaction) {
          console.log("Transaction: "+transaction)
          let message = `Payment Completed! Reference ${transaction.reference} `;
          console.log(transaction);
          if (transaction.message == "Approved" && transaction.status == "success") {
            postResponseToDB(transaction);
          }
          
        },
        onCancel() {          
          alert("Transaction Failed!")
        }
      })
      setPaystackResponse(paystack.data)
      console.log("Response Paystack: "+paystackResponse)

    } catch (error) {
      console.log(error + ' ERROR');
      setError(error.message);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.sellingPrice * item.quantity;
    });
    return total;
  };

  return (
    <>
    
    <form className='checkout-container' onSubmit={onSubmit}>
      <div className='checkout-details container'>
          <div className='details-header' >
            <BiCheckCircle /> Delivery Address
            <hr />
            <div className='edit-address'>Edit Address</div>
            <div className='name-input'>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text'
                required="required" 
                name="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <span>First Name</span>
              </div>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                 />
                <span>Last Name</span>
              </div>
            </div>
            <div className='mobile-input'>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="phoneNumber" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                 />
                <span>Phone Number</span>
              </div>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="alternativePhoneNumber" 
                value={alternativePhoneNumber}
                onChange={(e) => setAlternativePhoneNumber(e.target.value)}
                 />
                <span>Alternative Phone Number</span>
              </div>
            </div>
            <div className='delivery-address-input'>
              <div className='address-box'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="deliveryAddress" 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                 />
                <span>Delivery Address</span>
              </div>
            </div>

            <div className='delivery-address-input'>
              <div className='address-box'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="deliveryEmail" 
                value={deliveryEmail}
                onChange={(e) => setDeliveryEmail(e.target.value)}
                 />
                <span>Delivery Email</span>
              </div>
            </div>


            <div className='delivery-address-input'>
              <div className='address-box'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="additionalInformation" 
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
                 />
                <span>Additional Information</span>
              </div>
            </div>
            <div className='name-input'>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="region" 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                 />
                <span>Region</span>
              </div>
              <div className='inputBox'>
                <input 
                className='box' 
                type='text' 
                required="required"
                name="state" 
                value={state}
                onChange={(e) => setState(e.target.value)}
                 />
                <span>State</span>
              </div>
            </div>
          </div>
      </div>

      <div className='confirm-checkout-items container'>
      <div className='order-summary-header' >Order Summary</div>
      <hr></hr>
        <div className='order-summary-total'>
            <div className='info'>Item's total ( {cart.length} ) <span className='sum'># {calculateTotal()}</span> </div>
            <hr></hr>
            <div className='total'>Total: <span className='final-price'># {calculateTotal()}</span></div>
        </div>

        <button className='btn' type="submit">Confirm Order</button>
        <img src={storeAd}></img>
      </div>

      <div className='shipment container'>
        <div className='shipment-header'>
          <div>
            <BsFillTruckFrontFill /> Shipment
          </div>
          <div className='checked'>
            <BiCheckCircle /> Fulfilled by Jumia
          </div>
        </div>

        <div className='confirm-checkout-items container'>
        {cart.map((item, index) => (
          <div className='pickup' key={index}>
            <div className='header'>Pick Up Summary Items</div>
            <div className='summary'>
              <div className='img'>
                <img className='product-img' 
                        src={item.product.imageUrl} 
                        alt='product-px'></img>
              </div>
              <div className='info'>
                <div className='title'>{item.product.productName}</div>
                <div className='qty'>QTY: {item.quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </form>
    <Footer />

    </>
  );
}

export default Checkout;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import "./Checkout.css"
// import storeAd from '../components/imgs/official-stores.gif';
// import { BiCheckCircle } from 'react-icons/bi';
// import { BsFillTruckFrontFill } from 'react-icons/bs';
// import Footer from '../layout/Footer';
// import PaystackPop from "@paystack/inline-js";

// const Checkout = () => {
//   const location = useLocation();
//   const { cart } = location.state;
//   const navigate = useNavigate();

//   const [user, setUser] = useState({});
//   const [error, setError] = useState(null);
//   const [paystackResponse, setPaystackResponse] = useState('');

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     deliveryEmail: '',
//     phoneNumber: '',
//     alternativePhoneNumber: '',
//     deliveryAddress: '',
//     additionalInformation: '',
//     region: '',
//     state: ''
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/users/user/me', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             windows: 'true',
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleFormChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.product.sellingPrice * item.quantity, 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const total = calculateTotal();

//       const paystack = new PaystackPop();
//       paystack.newTransaction({
//         key: "pk_test_b5bb43e215fd5efc4f9a19e5fb2f4a01469550ca",
//         amount: total * 100,
//         email: formData.deliveryEmail,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         onSuccess(transaction) {
//           let message = `Payment Completed! Reference ${transaction.reference} `;
//           alert(message);


          

          

//         },
//         onCancel() {
//           alert("You have cancelled the transaction!");
//         }
//       });

//       setPaystackResponse(paystack.data);
//       console.log(paystackResponse)


//     } catch (error) {
//       console.error(error);
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <form className='checkout-container' onSubmit={handleSubmit}>
//         <div className='checkout-details container'>
//           <div className='details-header'>
//             <BiCheckCircle /> Delivery Address
//             <hr />
//             <div className='edit-address'>Edit Address</div>
//             <div className='name-input'>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='firstName'
//                   value={formData.firstName}
//                   onChange={handleFormChange}
//                 />
//                 <span>First Name</span>
//               </div>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='lastName'
//                   value={formData.lastName}
//                   onChange={handleFormChange}
//                 />
//                 <span>Last Name</span>
//               </div>
//             </div>
//             <div className='mobile-input'>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='phoneNumber'
//                   value={formData.phoneNumber}
//                   onChange={handleFormChange}
//                 />
//                 <span>Phone Number</span>
//               </div>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='alternativePhoneNumber'
//                   value={formData.alternativePhoneNumber}
//                   onChange={handleFormChange}
//                 />
//                 <span>Alternative Phone Number</span>
//               </div>
//             </div>
//             <div className='delivery-address-input'>
//               <div className='address-box'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='deliveryAddress'
//                   value={formData.deliveryAddress}
//                   onChange={handleFormChange}
//                 />
//                 <span>Delivery Address</span>
//               </div>
//             </div>

//             <div className='delivery-address-input'>
//               <div className='address-box'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='deliveryEmail'
//                   value={formData.deliveryEmail}
//                   onChange={handleFormChange}
//                 />
//                 <span>Delivery Email</span>
//               </div>
//             </div>

//             <div className='delivery-address-input'>
//               <div className='address-box'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='additionalInformation'
//                   value={formData.additionalInformation}
//                   onChange={handleFormChange}
//                 />
//                 <span>Additional Information</span>
//               </div>
//             </div>
//             <div className='name-input'>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='region'
//                   value={formData.region}
//                   onChange={handleFormChange}
//                 />
//                 <span>Region</span>
//               </div>
//               <div className='inputBox'>
//                 <input
//                   className='box'
//                   type='text'
//                   required
//                   name='state'
//                   value={formData.state}
//                   onChange={handleFormChange}
//                 />
//                 <span>State</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='confirm-checkout-items container'>
//           <div className='order-summary-header'>Order Summary</div>
//           <hr />
//           <div className='order-summary-total'>
//             <div className='info'>Item's total ({cart.length}) <span className='sum'># {calculateTotal()}</span> </div>
//             <hr />
//             <div className='total'>Total: <span className='final-price'># {calculateTotal()}</span></div>
//           </div>

//           <button className='btn' type='submit'>Proceed to Payment</button>

//           <div className='checkout-stores'>
//             <img src={storeAd} alt='Official stores' />
//             <p>Shop from official stores only</p>
//           </div>
//         </div>
//       </form>
//       <Footer />
//     </>
//   );
// };

// export default Checkout;