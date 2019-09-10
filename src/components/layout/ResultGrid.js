import React from "react";
import { useStoreState } from "easy-peasy";
import ResultThumbnail from "./ResultThumbnail";

export default function ResultGrid() {
  const results = useStoreState(state => state.filteredResults);
  const containerRef = React.createRef();
  const scrollTo = offset => {
    containerRef.current.scrollTop = offset - 5;
  };
  return (
    <div className="gridContainer" ref={containerRef}>
      <div className="resultGrid">
        {results.length > 0 &&
          results.map((listing, id) => (
            <ResultThumbnail
              key={id}
              listing={listing}
              id={id}
              focusHandler={scrollTo}
            />
          ))}
      </div>
    </div>
  );
}
