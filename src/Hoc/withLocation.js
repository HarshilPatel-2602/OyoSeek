import React from 'react';
import { useLocation } from 'react-router-dom';

function withLocation(WrappedComponent) {
  return function (props) {
    const location = useLocation(); 
    return <WrappedComponent {...props} location={location} />;  
  };
}

export default withLocation;