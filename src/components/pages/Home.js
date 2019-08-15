import React from "react";

export default function Home() {
  return (
    <div className="homePage">
      <div className="homePageContent">
        <h1> Find Local Homes</h1>
        <p>
          This site is for demonstration only and does not contain real listings
        </p>
        <div>
          <input type="text" name="cityTerm" placeholder="listings in:" />
          <button name="citySearchSubmit">Search</button>
        </div>
      </div>
    </div>
  );
}
