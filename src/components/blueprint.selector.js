import axios from 'axios';
import './blueprints.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BlueprintSelector() {
    
    // === [ Constants ] ===
    const URL = 'https://blueprint-forge-server.herokuapp.com/blueprints/';
    const [blueprints, updateBlueprints] = useState(() => { return [] });

    // === [ Framework ] ===
    
    useEffect(() => {
        getBlueprints();
    },[]);

    const getBlueprints = () => {
        axios.get(URL)
            .then(blueprints => {
                updateBlueprints(blueprints.data);
            })
    }

    // === [ DOM ] ===

    const loadAddBlueprint = () => {
        return <Link to={'/blueprint/'+'_add'}
                state={{ name: '_add' }}
                id={'add'}
                key={'blueprint-'+'_add'}
                className='card'>
                    {'+'}
                </Link>
    }

    const loadBlueprints = () => {
        if (!blueprints) {return '';}

        return blueprints.map(blueprint => {
            const {name, complete} = blueprint;

            return <Link to={'/blueprint/'+name}
                state={{ name: name }}
                id={'blueprint-'+name}
                key={'blueprint-'+name}
                className={'card ' + (complete ? 'complete' : 'incomplete')} 
                >
                    {name}
                </Link>
        })
    }

    return ( 
        <div id='container'>
            {loadBlueprints()}
            {loadAddBlueprint()}
        </div>
    );
}
 
export default BlueprintSelector;