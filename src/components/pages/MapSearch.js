import React, { Component } from 'react'

import SearchHeader from '..SearchHeader';

export default class MapSearch extends Component {
    constructor(){
        
    }

    render() {
        return (
            <div className="mapSearchPage">
                <SearchHeader />
                <div className="mapSearchContent">
                    <div id="resultsGrid">

                    </div>
                    <div id="mpaView"></div>
                </div>
            </div>
        )
    }
}
