import React, { Fragment } from 'react';
import {useStoreState} from 'easy-peasy';


import SearchHeader from '../layout/SearchHeader';

export default function MapSearch() {

    //TODO: get placeholder data and put it into store.

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
