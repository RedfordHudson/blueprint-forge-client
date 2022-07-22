import axios from 'axios';
import './spaces.selector.css';

import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EntityGallery() {

    // === [ Constants ] ===

    const location = useLocation();
    const {classId,element,field,type,classType} = location.state;
    let {associationList} = location.state;

    // const URL = 'http://localhost:3001/';
    const URL = 'https://blueprint-forge-server.herokuapp.com/';
    const expressBuffer = 25;

    const [entities, updateEntities] = useState(() => {return []})

    // === [ Framework ] ===

    useEffect(() => {
        getEntities();
    // eslint-disable-next-line 
    },[]);

    const getEntities = () => {
        axios.get(URL+'entities')
            .then(entities => {
                updateEntities(entities.data);
            })
    }
    
    // === [ DOM ] ===

    const loadEntities = () => {
        if (!entities.length) {return '';}

        let currentEntities = entities.filter(entity => associationList.includes(entity._id));

        return currentEntities.map(entity => {
            const {name, picture_URL, description, details} = entity;

            return <div
                id={'entity-'+name}
                key={'entity-'+name}
                className='card-container'>

                    <div className='card-title'>{name}</div>
                    <img className='card-image'
                        src={picture_URL}
                        alt=''/>
                    <div className='card-background' />
                    <div className='card-description'>{description}</div>
                    <div className='card-content'>
                        <button onClick={(e) => {
                        const state = e.target.nextElementSibling.style.visibility;
                        e.target.nextElementSibling.style.visibility = (!state || state === 'hidden') ? 'visible' : 'hidden'
                    }}
                    >Details</button>
                    <ul className='details'>

                        {loadMajorDetails(entity)}
                        { (details === undefined)?'':loadMinorDetails(details)}
                        
                        <button onClick={(e) => {
                            updateEntity(entity)
                            e.target.parentElement.style.visibility = 'hidden'   
                        }}>Save</button>
                        <button onClick={() => deleteEntity(entity)}>Delete</button>
                    </ul>
                </div>
            </div>
        })
    }

    const updateEntity = (entity) => {
        axios.patch(URL+'entities/update', entity)
            .then(() => {setTimeout(getEntities,expressBuffer)});
    }

    const updateAssociationList = (addFlag,entityId) => {

        if (addFlag) { // add id
            associationList.push(entityId);
        } else { // remove id
            associationList = associationList.filter(id => id!==entityId)
        }

        axios.patch(URL+'classes/updateAssociationList/'+classId, {associationList})
            .then(() => {setTimeout(getEntities,expressBuffer)});
    }

    const addEntity = () => {
        const newEntity = {
            element,
            field,
            type,
            class:classType,
            name:'New Entity',
            picture_URL:'',
            description:'',
            details:{
                keeper:'',
                schedule:'',
                address:'',
                website:'',
                email:'',
                phone:'',
                instagram:'',
                notes:''
            }
        }

        axios.post(URL+'entities/add', newEntity)
            .then(data => {updateAssociationList(true,data.data)})
    }

    const deleteEntity = (entity) => {
        axios.delete(URL+'entities/delete/'+entity._id)
            .then(() => {updateAssociationList(false,entity._id)})
    }

    const loadMajorDetails = (entity) => {
        return ['name','picture_URL','description'].map(property => {
            return <li key={'details-property-'+property}>
                <p>{property}</p>
                <textarea type='text'
                    defaultValue={entity[property]}
                    onChange={(e) => { 
                        entity[property] = e.target.value;
                    }} />
            </li>
        })
    }

    const loadMinorDetails = (details) => {
        return Object.keys(details).map(property => {

            return <li key={'details-property-'+property}>
                <p>{property}</p>
                <textarea type='text'
                    defaultValue={details[property]}
                    onChange={(e) => { 
                        details[property] = e.target.value;
                    }} />
            </li>
        })
    }

    return ( <>
        
        <div id='container'>

            <div id='frame-div'>
                <Link className='back frame'
                    to={'/'}
                    state={{
                        element,
                        field,
                        type
                    }}>Back</Link>
                <div className='frame'>{classType}</div>
            </div>

            {loadEntities()}

            <div id={'add'}
                key={'entity-_add'}
                className='card'
                onClick={addEntity}
                >
                {'+'}
            </div>
        </div>
        
    </>);
}
 
export default EntityGallery;