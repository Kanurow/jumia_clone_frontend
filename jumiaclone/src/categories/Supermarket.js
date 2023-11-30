import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./supermarket.css"
import leftAdvert from '../components/imgs/supermarket.jpg';
import rightAdvert from '../components/imgs/top-ad.png';
import SupermarketCarousel from './SupermarketCarousel';
import Footer from '../layout/Footer';



function Supermarket() {

  const [error, setError] = useState(null);
  const [supermarket, setSupermarket] = useState([]);

  useEffect(() => {
    const fetchSupermarketProducts = async () => {
      try {
        const response = await axios.get('https://jumia-clone-bra6.onrender.com/api/products/supermarket', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setSupermarket(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchSupermarketProducts();
  }, []);


  return (
    <>
    <div className='entire-page'>

      <div className='page-title'>
        Supermarket
      </div>
      <div className='advert'>
        <img className="advert-image" src={leftAdvert} alt="advert" />
        <img className="advert-image" src={rightAdvert} alt="advert" />
      </div>




      <div>
        <SupermarketCarousel />
      </div>

    <Footer />
    </div>
    </>
  )
}

export default Supermarket