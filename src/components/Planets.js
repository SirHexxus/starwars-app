import React, { useState } from 'react'
import { usePaginatedQuery } from 'react-query'

import Planet from './Planet'

const fetchPlanets = async (key, page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

function Planets() {
    const [ page, setPage ] = useState(1);
    const { 
        resolvedData,
        latestData,
        status
     } = usePaginatedQuery(['planets', page], fetchPlanets);
    // console.log(data);

    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{ status }</p> */}

            {/* <button onClick={() => page > 1 ? setPage(page-1) : setPage(1)}>&lt; prev</button>
            <button>page { page }/6</button>
            <button onClick={() => page < 6 ? setPage(page+1) : setPage(6)}>next &gt;</button> */}

            { status === 'loading' && (
                <div>Loading data...</div>
            )}

            { status === 'error' && (
                <div>Error fetching data</div>
            )}

            { status === 'success' && (
                <>
                    <button
                        onClick={() => setPage(old => Math.max(old - 1, 1))}
                        disabled={page===1}
                    >
                        &lt; prev
                    </button>
                    <span>{ page }</span>
                    <button
                        onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
                        disabled={!latestData || !latestData.next}
                    >
                        next &gt;
                    </button>
                    <div>
                        {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                    </div>
                </>
            )}

        </div>
    )
}

export default Planets
