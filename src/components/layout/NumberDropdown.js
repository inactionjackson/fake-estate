import React from "react";

export default function NumberDropdown({ min, max, steps }) {
  const numOfOptions = Math.Floor((max - min) / steps);
  //TODO: loop through and create steps
  //TODO: handle clicking on choice like in autocomplete
  return <div />;
}
