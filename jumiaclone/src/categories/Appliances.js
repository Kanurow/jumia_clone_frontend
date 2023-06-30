import React from 'react'
import AppliancesCarousel from './AppliancesCarousel'
import Footer from '../layout/Footer'
import "./Appliances.css"

export default function Appliances() {
  return (
    <>
    <div className='component'>
          <div>


        <div className='page-title'>
          Appliances
        </div>

    </div>

      <div>
        <AppliancesCarousel />
      </div>
      
    </div>
    <Footer />
    </>
  )
}
