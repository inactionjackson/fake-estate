import React from "react";
import { useStoreState } from "easy-peasy";

export default function SearchHeader() {
  const searchFilters = useStoreState(state => state.searchFilters);

  return <div className="SearchHeader" />;
}
