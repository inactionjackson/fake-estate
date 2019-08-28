import React from "react";
import { useStoreState } from "easy-peasy";

export default function ResultGrid() {
  const results = useStoreState(state => state.filteredResults);
  return (
    <div className="resultGrid">
      {results.length > 0 && results.map(listing => <div>listing.addr</div>)}
    </div>
  );
}
