import React from 'react';
import { ClipLoader } from 'react-spinners';

const SpinnerComponent = ({ color = 'black', size = 80, customCss = {}, ariaLabel = 'Loading Spinner' }) => {
  
  const defaultOverride = {
    display: "block",
    margin: "0 auto", 
  };
  
  const finalOverride = { 
      ...defaultOverride, 
      ...customCss 
  };

  return (
    <ClipLoader
      color={color}
      loading={true}
      cssOverride={finalOverride} 
      size={size}
      aria-label={ariaLabel}
      data-testid="loading-spinner"
    />
  );
};

export default SpinnerComponent;