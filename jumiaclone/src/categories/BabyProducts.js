import React from 'react'
import BabyProductsCarouse from './BabyProductsCarouse'

export default function BabyProducts() {
  return (
    <div>
      <div>
        <div className='page-title'>
          Baby Products
        </div>
        <div className='advert'>
        <img className="advert-image"  alt="advert" />
      </div>
      </div>

      <div>
        <BabyProductsCarouse />
      </div>
    </div>
  )
}
