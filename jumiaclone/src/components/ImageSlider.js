import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/ImageSlider.css';


import img1 from '../components/imgs/jumiaslider1.png';
import img2 from '../components/imgs/jumiaslider2.png';
import img3 from '../components/imgs/jumiaslider3.png';
import img4 from '../components/imgs/jumiaslider4.png';
import img5 from '../components/imgs/jumiaslider5.jpg';
import img6 from '../components/imgs/jumiaslider6.jpg';
import img7 from '../components/imgs/jumiaslider7.gif';



const ImageSlider = () => {


        // // Custom previous arrow component
        // const CustomPrevArrow = (props) => {
        //     const { className, onClick } = props;
        //     return (
        //       <button className={`${className} custom-prev-arrow`} onClick={onClick}>
        //         Previous
        //       </button>
        //     );
        //   };
        
        //   // Custom next arrow component
        //   const CustomNextArrow = (props) => {
        //     const { className, onClick } = props;
        //     return (
        //       <button className={`${className} custom-next-arrow`} onClick={onClick}>
        //         Next
        //       </button>
        //     );
        //   };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 5000, // every 5 secs
    arrows: false,
  };



  return (
    <Slider {...settings}>
      <div>
        <img className="slider-image" src={img1} alt="jum 1" />
      </div>
      <div>
        <img className="slider-image" src={img2} alt="jum 2" />
      </div>
      <div>
        <img className="slider-image" src={img3} alt="jum 3" />
      </div>
      <div>
        <img className="slider-image" src={img4} alt="jum 4" />
      </div>
      <div>
        <img className="slider-image" src={img5} alt="jum 5" />
      </div>
      <div>
        <img className="slider-image" src={img6} alt="jum 6" />
      </div>
      <div>
        <img className="slider-image" src={img7} alt="jum 7" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
