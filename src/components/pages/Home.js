import React, { Component } from 'react'

export default class home extends Component {
  render() {
    return (
      <div className="homePage">
        <div className="homePageContent">
          <h1> Find Local Homes</h1>
          <p>This site is for demonstration only and does not contain real listings</p>
          <div>
              <input type="text" name="cityTerm" placeholder="listings in:" />
              <input type="submit" name="citySearchSubmit" />
          </div>
        </div>
      </div>
    )
  }
}
