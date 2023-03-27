import React from 'react';

const Alert = props => {
  return (
    <div role="alert">
      <p>{props.message}</p>
    </div>
  );
};

export default Alert;
