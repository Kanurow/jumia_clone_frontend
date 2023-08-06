import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import top from './myjumia-top.png';
import bottom from "./myjumia-bottom-logo.png";


import PhoneInput from "react-phone-number-input";

import "./Auth.css";
import 'react-phone-number-input/style.css'
import Footer from '../layout/Footer';

export default function Register() {


    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [phone, setPhone] = useState('');

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        password: "",
        vendor: "",
        companyName: "",
        territory: "",
    })
    const { firstName, lastName, username, email,  dateOfBirth, password, vendor,  companyName, territory} = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    console.log(user);
    console.log(phone)

    const onSubmit =async (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastName,
            username,
            email,
            mobile: phone,
            dateOfBirth,
            password,
            vendor,
            companyName,
            territory
        }

        try {
            await axios.post("http://localhost:8080/api/auth/signup", userData);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }

    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <img className="jumia-top" src={top} alt="top" />
                <h3>Welcome to Jumia.</h3>
                    <form onSubmit={(e)=> onSubmit(e)}>
                        <div className='mb-2'>
                            <label htmlFor='firstName' className='form-label'>
                                First Name
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='lastName' className='form-label'>
                                Last Name
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        

                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Username
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Username'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Email
                            </label>
                            <input
                                type={"email"}
                                className='form-control'
                                placeholder='Enter Email '
                                name='email'
                                value={email} 
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='MobileNumber' className='form-label'>
                                Mobile
                            </label>
                            <PhoneInput
                                className='form-control'
                                placeholder='Enter Mobile Number '
                                name='phone'
                                value={phone} 
                                onChange={setPhone}
                            />
                        </div>



                        <div className='mb-3'>
                            <label htmlFor='DateOfBirth' className='form-label'>
                                Date of Birth
                            </label>
                            <br />
                            <DatePicker
                                selected={dateOfBirth} 
                                onChange={(date) => setUser({ ...user, dateOfBirth: date })} 
                                dateFormat='yyyy-MM-dd' 
                                className='form-control'
                                placeholderText='Select Date of Birth'
                                name='dateOfBirth'
                            />
                        </div>






                        <div className='mb-3'>
                            <label htmlFor='Password' className='form-label'>
                                Password
                            </label>
                            <input
                                type={"password"}
                                className='form-control'
                                placeholder='Enter Password '
                                name='password'
                                value={password} 
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <hr className='line-vendor'></hr>
                        <p>For Vendors</p>
                <div className='mb-3'>
                      <label htmlFor='Vendor' className='form-label'>
                          Are You A Vendor? (Optional)
                      </label>
                      <select
                          className='form-control'
                          name='vendor'
                          value={vendor}
                          onChange={(e) => onInputChange(e)}
                      >
                        <option value=''>Select Category</option>
                        <option value='YES'>YES</option>
                        <option value='NO'>NO</option>
                      </select>
                  </div>

                  <div className='mb-3'>
                            <label htmlFor='companyName' className='form-label'>
                                Company Name (Optional)
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Vendor Company Name'
                                name='companyName'
                                value={companyName} 
                                onChange={(e) => onInputChange(e)}
                            />
                </div>

                <div className='mb-3'>
                            <label htmlFor='territory' className='form-label'>
                                Territory  (Optional)
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Delivery Territory'
                                name='territory'
                                value={territory} 
                                onChange={(e) => onInputChange(e)}
                            />
                </div>


                        <p>For further support, you may visit the Help Center or contact our customer service team.</p>
                        <button type='submit' className='execute btn btn-outline-info'>Register</button>
                        <Link className='btn btn-outline-danger mx-2' to={"/login"}>Already have an account? Sign In</Link>
                    </form>
                    {error && <p className="text-danger">{error} : Fill All Form Fields Properly.</p>}
                </div>
            </div>

            
            <img className="jumia-bottom" src={bottom} alt="top" />

            <Footer />
        </div>
    )
}
