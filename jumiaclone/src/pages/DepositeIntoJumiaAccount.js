import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DepositeIntoJumiaAccount() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);

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
              setCurrentUser(response.data);
            } catch (error) {
              setError(error.message);
            }
          };
  
      fetchUser();
    }, []);

    const { username,  accountBalance} = currentUser;

  const onInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
  }

    const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/users/deposit/${currentUser.id}`, {
        depositAmount: accountBalance,
        },
        {
            headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response)
      setCurrentUser(response.data);
    } catch (error) {
      setError(error.message);
    }
    navigate(`/viewuser/${currentUser.id}`)
  }


  return (
    <>
    <div className='container'>
       <div className='row'>
         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
           <h3 className='text-center m-4'>Welcome {currentUser.username}! Make Deposit</h3>
           
           <form onSubmit={(e) => onSubmit(e)}>
             <div className='mb-3'>
               <label htmlFor='Name' className='form-label'>
                 Enter Amount
               </label>
              <input
                type={"number"}
                className='form-control'
                placeholder='How Much Do You Wish To Deposit'
                name='accountBalance'
                value={accountBalance}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            



            <button type='submit' className='btn btn-outline-info'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
          </form>
        </div>


      </div>

    </div>

    </>
  )
}
