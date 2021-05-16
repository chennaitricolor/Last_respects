import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const BaseContainer = ({
  children
}) => (
  <div className="base-container">
    <Header />
      { children }
    <Footer />
  </div>
);

export default BaseContainer;
