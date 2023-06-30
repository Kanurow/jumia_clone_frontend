import React from 'react'
import PhonesAndTabletsCarousel from './PhonesAndTabletsCarousel'

import imgAdvertLeft from '../components/imgs/bed.jpg';
import imgAdvertRight from '../components/imgs/travels.jpg';


function PhonesAndTablets() {
  return (
    <>
          <div className='page-title'>
            Phones And Tablets
          </div>
          <div className='advert'>
            <img className="advert-image" src={imgAdvertLeft} alt="advert" />
            <img className="advert-image" src={imgAdvertRight} alt="advert" />
          </div>


          <div>
            <PhonesAndTabletsCarousel />
          </div>
    </>
    
  )
}

export default PhonesAndTablets