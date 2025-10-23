import React, { useState } from 'react'

const ToggleFiltersButton = ({toggleFilters}) => {

    
  return (
    <button
      id="toggle-filters-btn"
      class="toggle-filters-btn"
      onClick={toggleFilters}
    >
      Show Filters
    </button>
  );
}

export default ToggleFiltersButton