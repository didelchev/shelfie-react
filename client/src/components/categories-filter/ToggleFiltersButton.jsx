import React, { useState } from 'react'

const ToggleFiltersButton = ({toggleFilters, showFilters}) => {
    
    
    
  return (
    <button
      id="toggle-filters-btn"
      class="toggle-filters-btn"
      onClick={toggleFilters}
    >
       {showFilters ? 'Hide Filters' : 'Show Filters'}
    </button>
  );
}

export default ToggleFiltersButton