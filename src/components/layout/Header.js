import React from "react";
import { Link } from "react-router-dom";

const NAME_STYLE = {
  color: "black"
};
const NAV_STYLE = {
  color: "black"
};

export default function Header() {
  return (
    <div className="header">
      <Link to="/" style={NAME_STYLE}>
        <p>Fakestate</p>
      </Link>
      <ul>
        <Link to="/mapSearch" style={NAV_STYLE}>
          <li>map search</li>
        </Link>
        <li>links</li>
      </ul>
    </div>
  );
}
