import React from 'react';
import { useParams } from 'react-router-dom';

function withParams(WrappedComponent) {
  return function (props) {

    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  };
}

export default withParams;
