
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const {id} = useParams()

    const [vendorsProfilePicture, setVendorsProfilePicture] = useState(null);
    const [vendorsCompanyLogo, setVendorsCompanyLogo] = useState(null);

    const [response, setResponse] = useState('');

    useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await axios.get(`https://jumia-clone-bra6.onrender.com/api/users/${id}`, {

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response.data)
          setUser(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchUser();
    }, []);

    const { firstName, lastName, username, email, mobile,  isVendor, territory, vendorCompany } = user;


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (user.isVendor == "True") {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('territory', territory);
      formData.append('profilePicture', vendorsProfilePicture);
      formData.append('companyLogo', vendorsCompanyLogo);
      formData.append('vendorCompany', vendorCompany);
      formData.append('userId', user.id);
  
      try {
        const response = await axios.put("https://jumia-clone-bra6.onrender.com/api/users/updateUserInformation", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        console.log(response.data);
        setResponse(response.data)
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    } else {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('territory', "territory");
      formData.append('profilePicture', "vendorsProfilePicture");
      formData.append('companyLogo', "vendorsCompanyLogo");
      formData.append('vendorCompany', "vendorCompany");
      formData.append('userId', user.id);
  
      try {
        const response = await axios.put("https://jumia-clone-bra6.onrender.com/api/users/updateUserInformation", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        console.log(response.data);
        setResponse(response.data)
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    }

  

  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  return (
    <>
    <div className='container'>
       <div className='row'>
         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
           <h2 className='text-center m-4'>Update User</h2>



           <form onSubmit={handleSubmit} encType='multipart/form-data'>
                  <div className='mb-3'>
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
                      <label htmlFor='Email' className='form-label'>
                          Email
                      </label>
                      <input
                          type={"email"}
                          className='form-control'
                          placeholder='Enter Email Address'
                          name='email'
                          value={email}
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
                      <label htmlFor='mobile' className='form-label'>
                          Mobile
                      </label>
                      <input
                          type={"number"}
                          className='form-control'
                          placeholder='Enter Mobile Number'
                          name='mobile'
                          value={mobile}
                          onChange={(e) => onInputChange(e)}
                      />
                  </div>




                  <div>
                { user.isVendor == "True" &&  

                        
                    <div>
                        <hr className='line-vendor'></hr>

                        <div className='mb-3'>
                            <label htmlFor='vendorCompany' className='form-label'>
                                Company Name
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Vendor Company Name'
                                name='vendorCompany'
                                value={vendorCompany} 
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


  

                        <div className='mb-3'>
                            <label htmlFor='territory' className='form-label'>
                                Territory 
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


                            <div className='mb-3'>
                            <label htmlFor='ProductImage' className='form-label'>
                                Upload Vendor Profile Image
                            </label>
                            <input
                                type={"file"}
                                accept="image/*"
                                className='form-control'
                                name='product-image'
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setVendorsProfilePicture(file);
                                }}
                            />
                        </div>


                  <div className='mb-3'>
                      <label htmlFor='ProductImage' className='form-label'>
                          Upload Company Logo
                      </label>
                      <input
                          type={"file"}
                          accept="image/*"
                          className='form-control'
                          name='product-image'
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setVendorsCompanyLogo(file);
                          }}
                      />
                  </div>
                    </div>
                
                }
            </div>


                  <button type='submit' className='btn btn-outline-info'>Update Profile Details</button>
                  <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
                  {error && <p className="text-danger">{error} : You have to be an admin.</p>}
                   <p className='text-warning'>{response}</p>
              </form>




        </div>


      </div>

    </div>

    </>
  )
}









