import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';

export default function SearchHeader() {
  const searchFilters = useStoreState(state => state.searchFilters);

  return (
    <div className="SearchHeader">
    //TODO: add dropdowns for search options
    </div>
  )

}
