import React from "react";
import { useStoreState } from "easy-peasy";
import ResultThumbnail from "./ResultThumbnail";

export default function ResultGrid() {
  const results = useStoreState(state => state.filteredResults);
  return (
    <div className="gridContainer">
      <div className="resultGrid">
        {results.length > 0 &&
          results.map((listing, id) => (
            <ResultThumbnail key={id} listing={listing} id={id} />
          ))}
      </div>
    </div>
  );
}
