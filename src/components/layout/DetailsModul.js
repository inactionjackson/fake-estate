import React from "react";
import { Formatters as F } from "../Formatters";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function DetailsModul() {
  const listing = useStoreState(state => state.listingBeingViewed);
  const setListingBeingViewed = useStoreActions(
    actions => actions.setListingBeingViewed
  );

  const displayListingSpecs = () => {
    return (
      F.price(listing.price) +
      "  |  " +
      F.bed(listing.bdr) +
      "/" +
      F.bath(listing.bth) +
      "  |  has garage: " +
      (listing.garage ? "Yes" : "No") +
      " | " +
      F.sqft(listing.sqf)
    );
  };
  const hideListing = () => {
    setListingBeingViewed(null);
    console.log("hide modul");
  };
  return (
    <div className="detailsModul">
      <div className="clickCapture" onClick={hideListing}></div>
      <div className="detailsContent">
        <div className="detailsGallery">
          <img src={listing.thumb} />
        </div>
        <div className="detailsInfo">
          <div className="infoSpecs">{displayListingSpecs()}</div>
          <div className="infoDescription">
            This is where listing details would go if this were a real listing.
            <br />
            All stock images are from unsplash.com
          </div>
        </div>
      </div>
    </div>
  );
}
