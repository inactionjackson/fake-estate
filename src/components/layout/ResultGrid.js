import React, { Fragment } from 'react';
import {useStoreState} from 'easy-peasy';

export default function ResultGrid() {
    const results = useStoreState(state => state.filteredResults);
    return (
        <div>
            {results.map(listing =>(
             <div>listing.addr</div>   
            ))}
        </div>
    )
}
