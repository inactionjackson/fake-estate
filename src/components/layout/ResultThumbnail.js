import React from "react";
import { Formatters as F } from "../Formatters";

export default function ResultThumbnail({ listing, id }) {
  return (
    <div className="resultThumbnail">
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
