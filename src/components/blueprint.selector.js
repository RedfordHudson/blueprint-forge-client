import axios from 'axios';
import './blueprints.css';

import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BlueprintSelector() {
    
    // === [ Constants ] ===

    const location = useLocation();

    // const URL = 'http://localhost:3001/';
    const URL = 'https://blueprint-forge-server.herokuapp.com/';
    const expressBuffer = 25;

    const [categories, updateCategories] = useState(() => { return [] });
    const [blueprints, updateBlueprints] = useState(() => { return [] });

    const [currentCategory, updateCurrentCategory] = useState(() => { 
        
        // improper fix to solution
        let category = 'Adventure';
        
        if (location?.state) {
            category = location.state.category;}
        
        return category});
    const [draggedBlueprint, updateDraggedBlueprint] = useState(() => { return '_' });

    // === [ Framework ] ===
    
    useEffect(() => {
        getCategories();
        getBlueprints();
    },[]);

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
        const blueprint = blueprints.filter(blueprint => blueprint.name === name)[0]
        const newBlueprint = {...blueprint, category}

        axios.patch(URL+'blueprints/update/'+blueprint._id,newBlueprint)
            .then(() => {setTimeout(getBlueprints,expressBuffer)});
    }

    const updateBlueprintPriority = (name, priority) => {
        const blueprint = blueprints.filter(blueprint => blueprint.name === name)[0]
        const newBlueprint = {...blueprint, priority:priority}

        axios.patch(URL+'blueprints/update/'+blueprint._id,newBlueprint)
            .then(() => {setTimeout(getBlueprints,expressBuffer)});
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

                        let dropTarget = e.target;

                        if (dropTarget.tagName === 'P') {dropTarget = dropTarget.parentElement}
                        else if (dropTarget.className.includes('indicator')) {dropTarget = dropTarget.parentElement.parentElement}

                        const id = dropTarget.id.split('-')[1];
                        
                        updateBlueprintCategory(draggedBlueprint,id);
                    }}                >
                    <p>{category}</p>
                    {indicator(category)}
                </li>
            }) }
        </ul>
    }

    const indicator = (category) => {
        const currentBlueprints = blueprints.filter(blueprint => blueprint.category === category);
        
        const completeCount = currentBlueprints.reduce( (count, blueprint) => {
            return count + (blueprint.complete ? 1 : 0);
        }, 0)

        const completeIndicator = !completeCount ? <></> : <li key='complete'
            className='indicator-complete'>
            {completeCount>1?completeCount:''}</li>

        return <ul className='indicator'>
            {[1,2,3].map(priority => {
                const count = currentBlueprints.reduce( (count, blueprint) => {
                    return count + (!blueprint.complete && blueprint.priority === priority ? 1 : 0);
                }, 0)

                return !count ? <></> : <li key={priority}
                    className={'indicator-priority-'+priority}>
                    {count>1?count:''}</li>
            })}

            {completeIndicator}   
        </ul>
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
                className={'card ' + (complete ? 'complete' : ' priority-'+priority)} 
                
                draggable='true'
                onDragStart={(e) => {
                    const name = e.target.id.split('-')[1];
                    updateDraggedBlueprint(name);
                }}
                >
                    <Link to={'/blueprint/'+name}
                        state={{ name, category: currentCategory }}
                        className='link'>
                        <p>{name}</p>
                    </Link>
                    {complete ? <></> : addPriorityRadio(name,priority)}
                    <button onClick={() => deleteBlueprint(name)}>Delete</button>
                </div>
        })
    }

    const addPriorityRadio = (name,priority) => {
        return <div className='radio'>
            {[1,2,3].map(i => {
                return <>
                    <input type='radio'
                        id={'blueprint-'+name+'-priority-'+i}
                        key={'blueprint-'+name+'-priority-'+i}
                        value={i}
                        checked={i===priority ? 'checked' : ''}
                        onChange={() => {updateBlueprintPriority(name,i)}}
                        name={'blueprint-'+name+'-priority'} />
                    <label htmlFor={'blueprint-'+name+'-priority-'+i}>{i}</label>
                </>
            })}
        </div>
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