import React from 'react'
import BooksCarousel from './BooksCarousel'

export default function Books() {
  return (
    <>
            <div className='page-title'>
               Books
            </div>
            <div className='advert'>
                <img className="advert-image"  alt="advert" />
                <img className="advert-image" alt="advert" />
            </div>



        <div>
          <BooksCarousel />
        </div>


    </>
  )
}
