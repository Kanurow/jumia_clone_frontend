import React, { useState } from 'react';

import top from './myjumia-top.png';
import bottom from "./myjumia-bottom-logo.png";

import "./Auth.css";
import Footer from '../layout/Footer';

export default function Logout() {




  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
              <img className="jumia-top" src={top} alt="top" />
              <h3>You hav successfully logged out.</h3>
            </h2>
            <div>Thank your for shopping with us.</div>
          </div>
        </div> 
        <img className="jumia-bottom" src={bottom} alt="top" />

      </div>
      <Footer />
    </>
  );
}
