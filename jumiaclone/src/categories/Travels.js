import axios from 'axios';
import React, { useEffect, useState } from 'react'



import "./travels.css"
import imgAdvertLeft from '../components/imgs/bed.jpg';
import imgAdvertRight from '../components/imgs/travels.jpg';
import TravelsCarousel from './TravelsCarousel';



function Travels() {

  const [error, setError] = useState(null);
  // const [travels, setTravels] = useState([]);

  useEffect(() => {
    // const fetchTravelProducts = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/api/products/travels', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //         windows: 'true',
    //       },
    //     });
    //     setTravels(response.data);
    //     console.log(response.data);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };
  
    // fetchTravelProducts();
  }, []);


  return (
    <>
    <div className='entire-page'>

      <div className='page-title'>
        Travels And Bookings
      </div>
      <div className='advert'>
        <img className="advert-image" src={imgAdvertLeft} alt="advert" />
        <img className="advert-image" src={imgAdvertRight} alt="advert" />
      </div>




      <div>
        <TravelsCarousel />
      </div>

    </div>
    </>
  )
}

export default Travels;
