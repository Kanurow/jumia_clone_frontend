import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Jumia Clone.
      </p>
      <p>
        &copy; {new Date().getFullYear()} Kanu Rowland. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
