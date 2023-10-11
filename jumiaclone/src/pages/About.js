import React from 'react';
import './About.css';
import Footer from '../layout/Footer';

const About = () => {
  return (
    <div>
    <div className="about-container">
      <div className="about-content">
        <h1>About Our E-commerce Platform</h1>
        <p>Welcome to <strong>Jumia Clone</strong>, where innovation meets convenience. Our platform is more 
        than just an e-commerce website; it's a seamless shopping experience designed with you in mind. We've 
        reimagined online shopping by combining cutting-edge technology with user-friendly design, creating 
        a digital marketplace that caters to your every need.</p>
        
        <h2>Our Technology Stack:</h2>
        <p>At  <strong>Jumia Clone</strong>, we pride ourselves on the robust technology that powers 
        our platform. Utilizing React for our front end ensures a smooth, responsive, and interactive 
        user interface. Our backend, built with Spring Boot, guarantees reliability and security, providing a 
        strong foundation for all our operations. With MySQL as our database management system, we ensure your
         data is stored securely and efficiently, enabling quick access to your information.</p>
        
        <h2>Innovative User Registration:</h2>
        <p>We've implemented a unique and secure way to manage user roles. To become an admin with
             special privileges, simply add the string "row" to your email address during registration.
              This simple step grants you access to additional features and enhanced control over your 
              shopping experience.</p>
        
        <h2>Enhanced Security with JWT Tokens:</h2>
        <p>Your security is our top priority. Our application is protected using JSON Web Tokens (JWT), 
            ensuring that your personal and financial information remains confidential and safeguarded at all 
            times. With our advanced security measures, you can shop with peace of mind, focusing on finding the 
            perfect products without worrying about data breaches.</p>
        
        <h2>Seamless Payment Processing with Paystack API:</h2>
        <p>We've integrated the Paystack API, a leading payment gateway in Nigeria, to facilitate secure and
             hassle-free transactions. Whether you're purchasing electronics, fashion items, or household 
             essentials, our payment system guarantees swift and reliable payments, making your shopping 
             experience effortless.</p>
        
        <h2>Shop from Your Favorite Vendors:</h2>
        <p> <strong>Jumia Clone</strong> goes beyond traditional e-commerce platforms. We understand the 
        importance of choice, which is why we've introduced a feature allowing you to shop directly from 
        your favorite vendors. Discover unique products, support local businesses, and enjoy a personalized 
        shopping journey tailored to your preferences.</p>
        
        <p>At Jumia, we're not just revolutionizing online shopping; we're enhancing it. Experience the future 
            of e-commerce today. Start exploring, start shopping, and let us redefine the way you shop online. 
            Thank you for choosing us as your preferred online shopping destination.</p>
        
        <p>Happy Shopping!</p>
        
        <p>Team Rowland</p>
      </div>
    </div>

    <Footer />

    </div>
  );
}

export default About;
