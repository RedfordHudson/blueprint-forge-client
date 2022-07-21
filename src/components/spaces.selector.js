import axios from 'axios';
import './spaces.selector.css';

// import { useLocation, Link, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SpacesSelector() {
    
    // === [ Constants ] ===

    // const URL = 'http://localhost:3001/';
    const URL = 'https://blueprint-forge-server.herokuapp.com/';
    const expressBuffer = 25;

    const [elements, updateElements] = useState(() => {return []})
    const [spaces, updateSpaces] = useState(() => {return []})

    const [currentElement, updateCurrentElement] = useState(() => {return 'Energy'}); 
    const [currentAttribute, updateCurrentAttribute] = useState(() => {return 'Strength'}); 

    const [draggedSpace, updateDraggedSpace] = useState(() => {return ''}); 

    // const polygonObj = useRef();

    // === [ Framework ] ===

    useEffect(() => {
        getElements();
        getSpaces();

        // polygonObj.addEventListener('click',() => {
        //     console.log('click')
        // })
    // eslint-disable-next-line 
    },[]);

    useEffect(() => {
        const name = elements.filter(element => element.function === currentElement)[0]?.attributes[0]?.attribute

        // console.log(name)

        updateCurrentAttribute(name ? name : 'Strength')
    },[elements, currentElement])

    const getElements = () => {
        axios.get(URL+'elements')
            .then(elements => {
                updateElements(elements.data.elements);
            })
    }

    const getSpaces = () => {
        axios.get(URL+'spaces')
            .then(spaces => {
                updateSpaces(spaces.data);
            })
    }
    
    // === [ DOM ] ===

    const primaryNavbar = () => {
        return <ul id='primaryNavbar'
            className='navbar'>
            { elements.map(element => {
                const name = element.function;

                return <li id={'element-'+name}
                    key={'element-'+name}
                    className={name === currentElement ? 'selected' : ''}
                    onClick={() => updateCurrentElement(name)}
                    
                    onDragOver={(e) => {
                        e.preventDefault()

                        updateCurrentElement(e.target.innerText)
                    }}
                    >
                    <p>{name}</p>
                </li>
            }) }
        </ul>
    }

    const secondaryNavbar = () => {
        const attributes = elements.filter(element => element.function === currentElement)[0]?.attributes;

        if (attributes === undefined) return;

        return <ul id='secondaryNavbar'
            className='navbar'>
            { attributes.map(attribute => {
                const name = attribute.attribute;

                return <li id={'attribute-'+name}
                    key={'attribute-'+name}
                    className={name === currentAttribute ? 'selected' : ''}
                    onClick={() => updateCurrentAttribute(name)}
                    
                    onDragOver={(e) => {
                        e.preventDefault()

                        updateCurrentAttribute(e.target.innerText)
                    }}
                    onDrop={(e) => {
                        e.preventDefault();

                        updateSpaceAttribute()
                    }}     
                    >
                    <p>{name}</p>
                </li>
            }) }
        </ul>
    }

    const loadSpaces = () => {
        if (!spaces.length) {return '';}

        let currentSpaces = spaces.filter(space => space.attribute === currentAttribute);

        return currentSpaces.map(space => {
            const {name} = space;

            return <div
                id={'space-'+name}
                key={'space-'+name}
                className='card-container'
                // style={{backgroundImage: 'url('+ (space.picture_URL) +')'}}
                
                draggable='true'
                onDragStart={() => {
                    updateDraggedSpace(space);
                }}
                >
                    <img className='card-image'
                        src={space.picture_URL}
                        alt=''/>
                    <div className='card-content'>
                        <p>{name}</p>
                        <button onClick={(e) => {
                            const state = e.target.nextElementSibling.style.visibility;
                            e.target.nextElementSibling.style.visibility = (!state || state === 'hidden') ? 'visible' : 'hidden'
                        }}
                        >Details</button>
                        <ul className='details'>
                            {loadSpaceDetails(space)}
                            
                            <button onClick={(e) => {
                                updateSpace(space)
                                e.target.parentElement.style.visibility = 'hidden'   
                            }}>Save</button>
                        </ul>
                        <button onClick={() => deleteSpace(space)}>Delete</button>
                    </div>
                </div>
        })
    }

    const updateSpaceAttribute = () => {
        draggedSpace.element = currentElement;
        draggedSpace.attribute = currentAttribute;

        axios.patch(URL+'spaces/update', draggedSpace)
            .then(() => {setTimeout(getSpaces,expressBuffer)});
    }

    const updateSpace = (space) => {
        console.log('saving '+space._id)
        axios.patch(URL+'spaces/update', space)
            .then(() => {setTimeout(getSpaces,expressBuffer)});
    }

    const deleteSpace = (space) => {
        axios.delete(URL+'spaces/delete/'+space._id)
            .then(() => {setTimeout(getSpaces,expressBuffer)});
    }

    const loadSpaceDetails = (space) => {
        return ['name'].concat(Object.keys(space).slice(4,Object.keys(space).length-1)).map(property => {
            return <li key={'space-property-'+property}>
                <p>{property}</p>
                <textarea type='text'
                    defaultValue={space[property]}
                    onChange={(e) => { 
                        space[property] = e.target.value;
                    }} />
            </li>
        })

    }
    
    const loadAddSpace = () => {
        return <div id={'add'}
            key={'space-_add'}
            className='card'
            onClick={() => {
                const newSpace = {
                    name:'New Space',
                    element:currentElement,
                    attribute:currentAttribute,
                    picture_URL:'',
                    keeper:'',
                    schedule:'',
                    address:'',
                    website:'',
                    email:'',
                    phone:'',
                    instagram:'',
                    twitter:'',
                    linkedin:'',
                    notes:''
                }

                axios.post(URL+'spaces/add', newSpace)
                .then(() => {setTimeout(getSpaces,expressBuffer)});
            }}
            >
            {'+'}
        </div>
    }

    return ( <>
        {primaryNavbar()}
        {secondaryNavbar()}
        <div id='container'>
            {loadSpaces()}
            {loadAddSpace()}
        </div>
    </>);

    /*
    return ( <div id='container'>
        
        
        <svg ref={polygonObj}>
            <polygon
                
                points='60 13,110 48,92, 110,30 110,13 48'
                stroke='violet'
                strokeWidth='5'
                fill='orange'
                style={{
                    // transform: 'rotate(-10 50 100)'
                }}
                onClick={(e) => {
                    e.target.style.transform = 'rotate(-10 50 100)'
                    console.log(e.target.style.transform)
                }}
                // transform="rotate(-10 50 100)"
                className='pentagon'>

            </polygon>
        </svg>
    </div> );
    */
}
 
export default SpacesSelector;