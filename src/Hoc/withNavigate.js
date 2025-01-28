// src/hoc/withNavigate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Higher-Order Component that injects navigate into class components
function withNavigate(Component) {
  return function (props) {
    const navigate = useNavigate(); // Use the hook to get navigate function
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigate;