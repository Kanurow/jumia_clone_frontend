import React from 'react'
import topImgAdvert from '../components/imgs/top-strip.gif';
import "./Computing.css"
import ComputingCarousel from './ComputingCarousel';
import Footer from '../layout/Footer';

export default function Computing() {
  return (
    <>
    <div className='entire-page'>
      <div className='advert'>
        <img className="ad-image" src={topImgAdvert}  alt="advert" />
      </div>

      <div className='page-title'>
        Computing
      </div>

    
    <ComputingCarousel />




      <div className='about-computing'> 
      <div className='title'>Explore Computer & Computing Accessories Online at Jumia</div>
      <p className='content'>

      Computers, regardless of their size and function, are becoming more than just a 
      fast-rising necessity in this generation. With a computing set of your own, you do not have 
      to run around in a time of emergency nor wait upon your television set to watch that classic
      movie in your comfort zone. Explore Jumia Nigeria to get computers with the best prices needed to

      is why you need to start exploring and shopping for things like computer hardware 
      components that are basically all the products used or plugged into your computer to help you use it 
      better.
      </p>
      

      <div className='title'>Shop Laptops Online at Jumia Nigeria</div>
      <p className='content'>
      Need to take your work everywhere you go conveniently, you sure need a latest laptop. The increasing portability of laptops is commendable and this is just the start of its benefits for humankind. It is flexible in its connectivity to other computing materials like printers, scanners, etc. Flexible for all age groups, all in one PC are a must-have for all students, as it makes life a lot easier for them in recording and keeping up with school works and improving their personal interest professionally with the use of the internet. With numerous laptop brands like Apple, Dell, HP, Lenovo, Acer, Asus, Intel and a whole lot more, you can pick out the best options on your durability, warranty, size and weight, specifications, speed, hard disk space, and price preferences. Be sure to look out for the Apple MacBook Air, Dell XPS 13, Lenovo IdeaPad, HP Pavilion, Macbook Pro , Chromebook, Acer Nitro 5, Macbook air m1, Lenovo Thinkpad, Asus Vivobook, Dell Inspiron, Acer Aspire 5, Lenovo Legion, HP spectre x360, Lenovo yoga, HP elitebook as you explore Jumia Nigeria.

      There are basic amenities that are needed just to make your computing life easier. The wide variety of printers, keyboards, photocopiers, motherboard, logitech wireless mouse, bluetooth keyboard and mouse, wireless mouse and keyboard, computer bag, computer cables, HP printer and scanners available allows you to pick your preference based on size and power specifications. You can go for a monochrome display printer or upper grade colored printer/scanner to give you the perfect output you are looking out for. The printer + scanner + photocopier set makes your workspace as compact as possible combining all task in one, check out the HP Deskjet all in one printer for your selection. Get your optimum performance mouse online, browse through to see the different ultra slim wireless mouse with 2.4 GHz from HP and other trusted brands, or go for a wired mouse that best suit your preference. Be sure to browse through for your new authentic chargers, portable flash drives of different storage sizes from Sandisk, Seagate and other brands, portable hard drives of up to 1 TB from Toshiba, HP, and other trusted brands and a whole lot more accessories.
      </p>

      
 </div>
 <Footer />

 </div>
          
    </>

  )
}
