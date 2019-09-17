import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ResultThumbnail from "./ResultThumbnail";

export default function ResultGrid() {
  const results = useStoreState(state => state.filteredResults);
  const [bCanScroll, setbCanScroll] = useState(true);
  const containerRef = React.createRef();

  const scrollTo = offset => {
    let curScroll = containerRef.current.scrollTop;
    let height = containerRef.current.offsetHeight;
    if (offset > curScroll + height || (offset < curScroll && bCanScroll)) {
      containerRef.current.scrollTop = offset - 5;
      setbCanScroll(false);
      setTimeout(() => {
        setbCanScroll(true);
      }, 300);
    }
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
