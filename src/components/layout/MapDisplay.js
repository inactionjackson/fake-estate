import React, { useEffect } from "react";
import L from "leaflet";

export default function MapDisplay() {
  let map = {};
  let mapTiles = {};
  useEffect(() => {
    map = L.map("mapDisplay").setView([41.0814, -81.519], 13);
    mapTiles = L.tileLayer(
      "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map);
    //TODO: replace with coords of selected city
  }, []);
  return <div id="mapDisplay"></div>;
}
