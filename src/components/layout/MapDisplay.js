import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Axios from "axios";
import L from "leaflet";
import { Formatters as F } from "../Formatters";

export default function MapDisplay() {
  const g_selectedCity = useStoreState(state => state.selectedCity);
  const g_fullResults = useStoreState(state => state.fullResults);
  const g_filteredResults = useStoreState(state => state.filteredResults);
  const g_setFullResults = useStoreActions(actions => actions.setFullResults);
  const g_selectedHouseId = useStoreState(state => state.selectedHouseId);
  const g_setSelectedHouseId = useStoreActions(
    actions => actions.setSelectedHouseId
  );
  const g_setListingBeingViewed = useStoreActions(
    actions => actions.setListingBeingViewed
  );
  const [bFailedToLoadMap, setbFailedToLoadMap] = useState(false);
  const [map, setMap] = useState(null);
  const [bNewHouseCoordsNeeded, setbNewHouseCoordsNeeded] = useState(false);
  const [markers, setMarkers] = useState([]);

  const getRandomCoordinate = () => {
    if (map) {
      let x = Math.floor(Math.random() * Math.floor(map.getSize().x));
      let y = Math.floor(Math.random() * Math.floor(map.getSize().y));
      return L.point(x, y);
    }
  };
  const markerHoverHandler = id => {
    g_setSelectedHouseId(id);
  };
  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const url =
      "https://api.opencagedata.com/geocode/v1/json?key=2573852ff477475fa7c0da745eeea496&q=" +
      g_selectedCity.city +
      "+" +
      g_selectedCity.state;
    Axios.get(url)
      .catch(error => {
        console.log(error);
      })
      .then(res => {
        try {
          document.getElementById("mapDisplay").innerHTML =
            "<div id='map' style='width: 100%; height: 100%;'></div>";
          let newMap = L.map("map").setView(
            [
              res.data.results[0].geometry.lat,
              res.data.results[0].geometry.lng
            ],
            13
          );
          let mapTiles = L.tileLayer(
            "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
            {
              maxZoom: 19,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          ).addTo(newMap);
          setMap(newMap);
          setbNewHouseCoordsNeeded(true);
        } catch (e) {
          console.log("could not retrieve map coordinates:" + e);
          setbFailedToLoadMap(true);
        }
      });
    return () => {
      source.cancel("MapDisplay component unmounted");
    };
  }, [g_selectedCity]);

  useEffect(() => {
    if (
      g_fullResults.length > 0 &&
      !g_fullResults[0].hasOwnProperty("coords") &&
      map
    ) {
      let mappedHouses = g_fullResults.map(house => {
        let coords = map.containerPointToLayerPoint(getRandomCoordinate());
        coords = map.layerPointToLatLng(coords);
        return {
          ...house,
          coords
        };
      });
      g_setFullResults(mappedHouses);
    }
    setbNewHouseCoordsNeeded(false);
  }, [bNewHouseCoordsNeeded]);

  useEffect(() => {
    if (g_filteredResults.length > 0 && map) {
      markers.forEach(m => {
        if (m) {
          m.marker.removeFrom(map);
        }
      });
      setMarkers([]);
      setMarkers(
        g_filteredResults.map((house, i) => {
          if (house.coords) {
            let m = L.marker(house.coords);
            m.addTo(map);
            m.bindPopup(F.price(house.price));
            m.on("mouseover", () => {
              markerHoverHandler(house.id);
            });
            m.on("click", () => {
              g_setListingBeingViewed(house.id);
            });
            return { marker: m, id: house.id };
          }
        })
      );
    } else if (g_filteredResults.length === 0) {
      markers.forEach(m => {
        m.marker.removeFrom(map);
      });
      setMarkers([]);
    }
  }, [g_filteredResults]);

  useEffect(() => {
    markers.forEach(m => {
      if (m.id === g_selectedHouseId) {
        m.marker.openPopup();
        return;
      }
    });
  }, [g_selectedHouseId]);

  if (bFailedToLoadMap) {
    return <Redirect to="/" />;
  }
  return (
    <div id="mapDisplay">
      <div>loading...</div>
    </div>
  );
}
