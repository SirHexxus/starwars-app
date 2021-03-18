import React from 'react'
import { useQuery } from 'react-query'

import Person from './Person'

const fetchPlanets = async () => {
    const res = await fetch('http://swapi.dev/api/people');
    return res.json();
}

function People() {
    const { data, status } = useQuery('people', fetchPlanets);
    // console.log(data);

    return (
        <div>
            <h2>People</h2>
            {/* <p>{ status }</p> */}

            { status === 'loading' && (
                <div>Loading data...</div>
            )}

            { status === 'error' && (
                <div>Error fetching data</div>
            )}

            { status === 'success' && (
                <div>
                    {data.results.map(person => <Person key={person.name} person={person} />)}
                </div>
            )}

        </div>
    )
}

export default People

