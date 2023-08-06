import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import top from './myjumia-top.png';
import bottom from "./myjumia-bottom-logo.png";
import Footer from '../layout/Footer';

const CreateProductForm = () => {

  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');


  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [percentageDiscount, setPercentageDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
            'http://localhost:8080/api/users/user/me',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                windows: 'true',
              },
            }
          );
          setUser(userResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('percentageDiscount', percentageDiscount);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('imageFile', image);
    formData.append('userId', user.id);

    try {
      const response = await axios.post("http://localhost:8080/api/products/createProduct", formData, {
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
  };


  return (
    <>
      <div className='container'>
      <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <img className="jumia-top" src={top} alt="top" />
              <h2 className='text-center m-4'>Create Product</h2>
              <p className='text-danger'>PS: Must be signed in as Admin to create products.</p>
              <form onSubmit={handleSubmit} encType='multipart/form-data'>
                  <div className='mb-3'>
                      <label htmlFor='Name' className='form-label'>
                          Product Name
                      </label>
                      <input
                          type={"text"}
                          className='form-control'
                          placeholder='Enter Name of Product'
                          name='productName'
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                      />
                  </div>

                  <div className='mb-3'>
                      <label htmlFor='Quantity' className='form-label'>
                          Select Product Category
                      </label>
                      <select
                          className='form-control'
                          name='category'
                          value={category}
                          required
                          onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value=''>Select Category</option>
                        <option value='SUPERMARKET'>Supermarket</option>
                        <option value='COMPUTING'>Computing</option>
                        <option value='PHONES'>Phones</option>
                        <option value='TRAVELS'>Travels</option>
                        <option value='ELECTRONICS'>Electronics</option>
                        <option value='BOOKS'>Books</option>
                        <option value='BABY'>Baby Products</option>
                        <option value='APPLIANCES'>Appliances</option>
                        <option value='OTHERS'>Others</option>

                      </select>
                  </div>

                  <div className='mb-3'>
                      <label htmlFor='Price' className='form-label'>
                          Price
                      </label>
                      <input
                          type={"number"}
                          className='form-control'
                          placeholder='Enter Price of Product '
                          name='price'
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)}
                      />
                  </div>


                  <div className='mb-3'>
                      <label htmlFor='percentageDiscount' className='form-label'>
                      Percentage Discount
                      </label>
                      <select
                          className='form-control'
                          name='percentageDiscount'
                          value={percentageDiscount}
                          required
                          onChange={(e) => setPercentageDiscount(e.target.value)}
                      >
                        <option value=''>Select Percentage Discount</option>
                        <option value='0'>0% ie No Discount</option>
                        <option value='10'>10%</option>
                        <option value='20'>20%</option>
                        <option value='30'>30%</option>
                        <option value='40'>40%</option>
                        <option value='50'>50%</option>
                        <option value='60'>60%</option>

                      </select>
                  </div>

                  <div className='mb-3'>
                      <label htmlFor='Quantiry' className='form-label'>
                          Quantity In Stock
                      </label>
                      <input
                          type={"number"}
                          className='form-control'
                          placeholder='Enter Available Quantity'
                          name='quantity'
                          value={quantity} 
                          onChange={(e) => setQuantity(e.target.value)}
                      />
                  </div>


                  <div className='mb-3'>
                      <label htmlFor='Description' className='form-label'>
                          Product Description
                      </label>

                      <input
                          type={"text"}
                          className='form-control'
                          placeholder='Write Product Information'
                          name='description'
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>


                  <div className='mb-3'>
                      <label htmlFor='ProductImage' className='form-label'>
                          Upload Product Image
                      </label>
                      <input
                          type={"file"}
                          accept="image/*"
                          className='form-control'
                          name='product-image'
                        //   value={image} 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file);
                          }}
                      />
                  </div>

                  <button type='submit' className='btn btn-outline-info'>Add Product</button>
                  <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
                  {error && <p className="text-danger">{error} : You have to be an admin.</p>}
                   <p className='text-warning'>{response}</p>
              </form>
          </div>
      </div>

      <img className="jumia-bottom" src={bottom} alt="top" />

      </div>
      <Footer />

      </>
  );
};

export default CreateProductForm;





