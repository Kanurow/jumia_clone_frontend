import axios from 'axios';
import React, { useEffect, useState } from 'react'



import "./travels.css"
import imgAdvertLeft from '../components/imgs/bed.jpg';
import imgAdvertRight from '../components/imgs/travels.jpg';
import TravelsCarousel from './TravelsCarousel';



function Travels() {

  const [error, setError] = useState(null);
  // const [travels, setTravels] = useState([]);



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
