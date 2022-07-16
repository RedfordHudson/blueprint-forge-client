import axios from 'axios';
import './blueprints.css';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BlueprintSelector() {
    
    // === [ Constants ] ===
    
    // const URL = 'http://localhost:3001/';
    const URL = 'https://blueprint-forge-server.herokuapp.com/';
    const expressBuffer = 25;

    const [categories, updateCategories] = useState(() => { return [] });
    const [blueprints, updateBlueprints] = useState(() => { return [] });

    const [currentCategory, updateCurrentCategory] = useState(() => { return 'undecided' });
    const [draggedBlueprint, updateDraggedBlueprint] = useState(() => { return 'l' });

    // === [ Framework ] ===
    
    useEffect(() => {
        getCategories();
        getBlueprints();
    },[]);

    useEffect(() => {
        updateCurrentCategory(categories[0])
    }, [categories]);

    const getCategories = () => {
        axios.get(URL+'categories/')
            .then(categories => {
                updateCategories(categories.data.categories)
            })
    }

    const getBlueprints = () => {
        axios.get(URL+'blueprints/')
            .then(blueprints => {
                updateBlueprints(blueprints.data);
            })
    }

    // === [ DOM ] ===

    const deleteBlueprint = (name) => {
        axios.delete(URL+'blueprints/delete/'+name)
            .then(() => {setTimeout(getBlueprints,expressBuffer)});
    }

    const updateBlueprintCategory = (name, category) => {

        console.log('updating '+name+' to '+category)

        const blueprint = blueprints.filter(blueprint => blueprint.name === name)[0]
        const newBlueprint = {...blueprint, category}

        console.log(newBlueprint)

        axios.patch(URL+'blueprints/update/'+blueprint._id,newBlueprint)
            .then(() => {setTimeout(getBlueprints,expressBuffer)});
    }

    const updateBlueprintPriority = (name, priority) => {
        const blueprint = blueprints.filter(blueprint => blueprint.name === name)[0]
        const newBlueprint = {...blueprint, priority}

        axios.patch(URL+'blueprints/update/'+blueprint._id,newBlueprint)
            .then(() => {setTimeout(getBlueprints,expressBuffer)});
    }

    const loadBlueprints = () => {
        if (!blueprints) {return '';}
        
        let currentBlueprints = blueprints.filter(blueprint => blueprint.category === currentCategory);

        return currentBlueprints.map(blueprint => {
            const {name, complete} = blueprint;

            // eventually, this should not be necessary
            const priority = blueprint.priority ? blueprint.priority : 3;

            return <div
                id={'blueprint-'+name}
                key={'blueprint-'+name}
                className={'card ' + (complete ? 'complete' : 'incomplete') + ' priority-'+priority} 
                
                draggable='true'
                onDragStart={(e) => {
                    const name = e.target.id.split('-')[1];
                    updateDraggedBlueprint(name);
                }}
                >
                    <Link to={'/blueprint/'+name}
                        state={{ name: name }}
                        className='link'>
                        {name}
                    </Link>
                    <div className='radio'>
                        Priority:
                        {[1,2,3].map(i => {
                            return <>
                                <input type='radio'
                                    id={'priority-'+i}
                                    key={'blueprint-'+name+'-priority-'+i}
                                    value={i}
                                    checked={i===priority ? 'checked' : ''}
                                    onChange={(e) => {
                                        const i = e.currentTarget.id.split('-')[1]
                                        updateBlueprintPriority(name,i)}}
                                    name={'blueprint-'+name+'-priority'} />
                                <label>{i}</label>
                            </>
                        })}
                    </div>
                    <button onClick={() => deleteBlueprint(name)}>Delete</button>
                </div>
        })
    }

    const navbar = () => {
        return <ul id='navbar'>
            { categories.map(category => {
                return <li id={'category-'+category}
                    key={'category-'+category}
                    className={category === currentCategory ? 'selected' : ''}
                    onClick={() => updateCurrentCategory(category)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();

                        let id = e.target.id;
                        if (!id) {id = e.target.parentElement.id}
                        
                        updateBlueprintCategory(draggedBlueprint,id.split('-')[1]);
                    }}                >
                    <p>{category}</p>
                </li>
            }) }
        </ul>
    }
    
    const loadAddBlueprint = () => {
        return <Link to={'/blueprint/_add'}
                state={{ name: '_add', category: currentCategory }}
                id={'add'}
                key={'blueprint-_add'}
                className='card'>
                    {'+'}
                </Link>
    }

    return ( <>
        {navbar()}
        <div id='container'>
            {loadBlueprints()}
            {loadAddBlueprint()}
        </div>
    </>);
}
 
export default BlueprintSelector;