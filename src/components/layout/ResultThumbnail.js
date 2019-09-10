import React, { useState, useEffect } from "react";
import { Formatters as F } from "../Formatters";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function ResultThumbnail({ listing, id, focusHandler }) {
  const g_setSelectedHouseId = useStoreActions(
    actions => actions.setSelectedHouseId
  );
  const g_selectedHouseId = useStoreState(state => state.selectedHouseId);
  const [bSelected, setbSelected] = useState(false);
  const ref = React.createRef();
  useEffect(() => {
    if (listing.id === g_selectedHouseId) {
      setbSelected(true);
      console.log(window.innerHeight);
      if (ref.current.offsetTop > window.innerHeight) {
        focusHandler(ref.current.offsetTop);
      }
    } else {
      setbSelected(false);
    }
  }, [g_selectedHouseId]);
  return (
    <div
      className={(bSelected ? "selectedThumb " : "") + "resultThumbnail"}
      onMouseOver={() => {
        g_setSelectedHouseId(listing.id);
      }}
      ref={ref}
    >
      <img src={listing.thumb} />
      <div>
        <span className="thumb_price">{F.price(listing.price)}</span>
        <span className="thumb_bedbath">
          {F.bed(listing.bdr) + " / " + F.bath(listing.bth)}
        </span>
      </div>
    </div>
  );
}
