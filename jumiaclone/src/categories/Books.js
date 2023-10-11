import React from 'react'
import BooksCarousel from './BooksCarousel'
import leftAdvert from '../components/imgs/books.jpg';
import rightAdvert from '../components/imgs/bookNovel.jpg';

export default function Books() {
  return (
    <>
            <div className='page-title'>
               Books
            </div>
            <div className='advert'>
              <img className="advert-image" src={leftAdvert} alt="advert" />
              <img className="advert-image" src={rightAdvert} alt="advert" />
            </div>

        <div>
          <BooksCarousel />
        </div>


    </>
  )
}
