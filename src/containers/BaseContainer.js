import React from 'react';
import Header from '../components/Header';

const BaseContainer = ({
  children
}) => (
  <div className="base-container pb-4">
    <Header />
      { children }
  </div>
);

export default BaseContainer;
