import React from 'react'
import OtherProductsCarousel from './OtherProductsCarousel'

export default function OtherProducts() {
  return (
    <>
    <div>
    <div className='advert'>
        <img className="ad-image"  alt="advert" />
      </div>

      <div className='page-title'>
        Others - A Flexible Category
      </div>
    </div>


    <div>
      <OtherProductsCarousel />
    </div>
    
    </>
    
  )
}
