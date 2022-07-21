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
        // axios.get(URL+'elements')
        //     .then(elements => {
        //         updateElements(elements.data.elements);
        //     })

        updateElements([
            {
                "anatomic": "Physical",
                "civic": "Industrial",
                "function": "Energy",
                "element": "Fire",
                "attributes": [
                    {
                        "attribute": "Strength",
                        "anatomic": "Musculature",
                        "civic": "Military",
                        "mythological": "Ares",
                        "professional": "Soldier",
                        "fantastic": "Warrior",
                        "description": "Volume of potential force to be mobilized."
                    },
                    {
                        "attribute": "Fortitude",
                        "anatomic": "Skeleton",
                        "civic": "Industry",
                        "mythological": "Vulcan",
                        "professional": "Constructor",
                        "fantastic": "Mason",
                        "aesthetic": "Steampunk",
                        "description": "..."
                    },
                    {
                        "attribute": "Resistance",
                        "anatomic": "Integument",
                        "civic": "Boundary",
                        "mythological": "Terminus",
                        "professional": "Warden",
                        "fantastic": "Guardian",
                        "description": "..."
                    },
                    {
                        "attribute": "Immunity",
                        "anatomic": "Immune System",
                        "civic": "Law Enforcement",
                        "mythological": "Thanatos",
                        "professional": "Officer",
                        "fantastic": "Paladin",
                        "description": "..."
                    },
                    {
                        "attribute": "Tension",
                        "anatomic": "Tendons",
                        "civic": "?",
                        "mythological": "Artemis",
                        "professional": "Spy",
                        "fantastic": "Archer",
                        "description": "..."
                    },
                    {
                        "attribute": "Constitution",
                        "anatomic": "Connective Tissue",
                        "civic": "Religious",
                        "mythological": "?",
                        "professional": "Priest",
                        "fantastic": "Priest",
                        "description": "..."
                    }
                ]
            },
            {
                "anatomic": "Financial",
                "civic": "Economic",
                "function": "Capital",
                "element": "Water",
                "attributes": [
                    {
                        "attribute": "Acquisition",
                        "anatomic": "Digestion",
                        "civic": "Resource Extraction",
                        "mythological": "Hades",
                        "professional": "Miner",
                        "fantastic": "Necromancer",
                        "description": "..."
                    },
                    {
                        "attribute": "Logistics",
                        "anatomic": "Circulation",
                        "civic": "Infrastructure",
                        "mythological": "Poseidon",
                        "professional": "Supplier",
                        "fantastic": "Geomancer",
                        "aesthetic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Agility",
                        "anatomic": "Peripheral Nervous",
                        "civic": "Communication",
                        "mythological": "Hermes",
                        "professional": "Ambassador",
                        "fantastic": "Rogue",
                        "description": "..."
                    },
                    {
                        "attribute": "Trade",
                        "anatomic": "Pancreas?",
                        "civic": "Commerce",
                        "mythological": "Mercury",
                        "professional": "Salesman",
                        "fantastic": "Merchant",
                        "description": "..."
                    },
                    {
                        "attribute": "Business",
                        "anatomic": "?",
                        "civic": "Business",
                        "mythological": "Neptune",
                        "professional": "Entrepreneur",
                        "fantastic": "?",
                        "description": ""
                    },
                    {
                        "attribute": "Security",
                        "anatomic": "Adipose Tissue",
                        "civic": "Banks",
                        "mythological": "Plutus",
                        "professional": "Banker",
                        "fantastic": "?",
                        "description": "..."
                    }
                ]
            },
            {
                "anatomic": "Healthy",
                "civic": "Popular",
                "function": "People",
                "element": "Earth",
                "attributes": [
                    {
                        "attribute": "Vitality",
                        "anatomic": "Heart",
                        "civic": "Residence",
                        "mythological": "Hestia",
                        "professional": "Keeper",
                        "fantastic": "Saint",
                        "description": "..."
                    },
                    {
                        "attribute": "Morale",
                        "anatomic": "Vasculature",
                        "civic": "Utilities",
                        "mythological": "Hera",
                        "professional": "Caretaker",
                        "fantastic": "?",
                        "aesthetic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Festivity",
                        "anatomic": "Pancreas?",
                        "civic": "Entertainment",
                        "mythological": "Dionysus",
                        "professional": "Entertainer",
                        "fantastic": "Minstrel",
                        "description": "..."
                    },
                    {
                        "attribute": "Stamina",
                        "anatomic": "Intestines",
                        "civic": "Agriculture",
                        "mythological": "Demeter",
                        "professional": "Farmer",
                        "fantastic": "Druid",
                        "description": "..."
                    },
                    {
                        "attribute": "Inspiration",
                        "anatomic": "Respiratory",
                        "mythological": "Zephyrus",
                        "professional": "Gardener",
                        "fantastic": "Solarpunk",
                        "description": ""
                    },
                    {
                        "attribute": "Regeneration",
                        "anatomic": "Lymphae",
                        "civic": "Hospitals",
                        "mythological": "Panacea",
                        "professional": "Nurse",
                        "fantastic": "Medic?",
                        "description": "..."
                    },
                    {
                        "attribute": "Clarity",
                        "anatomic": "Nephron",
                        "civic": "Hygiene",
                        "mythological": "Hygeia",
                        "professional": "Custodian",
                        "fantastic": "?",
                        "description": "..."
                    }
                ]
            },
            {
                "anatomic": "Spiritual",
                "civic": "Cultural",
                "function": "Spirit",
                "element": "Aether",
                "attributes": [
                    {
                        "attribute": "Charisma",
                        "anatomic": "?",
                        "civic": "Theater",
                        "mythological": "Apollo",
                        "professional": "Performer",
                        "fantastic": "Bard",
                        "aesthetic": "Drama",
                        "description": "..."
                    },
                    {
                        "attribute": "Competition",
                        "anatomic": "Sympathetic",
                        "civic": "Sports",
                        "mythological": "Nike",
                        "professional": "Athlete",
                        "fantastic": "?",
                        "description": ""
                    },
                    {
                        "attribute": "Adventure",
                        "anatomic": "?",
                        "civic": "Gaming",
                        "mythological": "?",
                        "professional": "Gamer",
                        "fantastic": "Explorer",
                        "description": ""
                    },
                    {
                        "attribute": "Beauty",
                        "anatomic": "Reproductive System",
                        "civic": "Energy",
                        "mythological": "Aphrodite",
                        "professional": "?",
                        "fantastic": "Enchantress",
                        "aesthetic": "Romance",
                        "description": "..."
                    },
                    {
                        "attribute": "Magic",
                        "anatomic": "Unconscious",
                        "civic": "Artifice",
                        "mythological": "Hecate",
                        "professional": "Artist",
                        "fantastic": "Sorcerer",
                        "aesthetic": "Surreality",
                        "description": "..."
                    },
                    {
                        "attribute": "Mystery",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "Hecate",
                        "professional": "?",
                        "fantastic": "Fortune Teller",
                        "description": "..."
                    }
                ]
            },
            {
                "anatomic": "Cognitive",
                "civic": "Governmental",
                "function": "Information",
                "element": "Air",
                "attributes": [
                    {
                        "attribute": "Volition",
                        "anatomic": "Central Nervous System",
                        "civic": "Execution",
                        "mythological": "Jupiter",
                        "professional": "Administrator",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Dexterity",
                        "anatomic": "?",
                        "civic": "Legislation",
                        "mythological": "Athena",
                        "professional": "Strategist",
                        "fantastic": "Tactician",
                        "description": "..."
                    },
                    {
                        "attribute": "Intelligence",
                        "anatomic": "?",
                        "civic": "Science",
                        "mythological": "Hephaestus",
                        "professional": "Researcher",
                        "fantastic": "Technomancer",
                        "description": "..."
                    },
                    {
                        "attribute": "Wisdom",
                        "anatomic": "Memory",
                        "civic": "Academia",
                        "mythological": "Chiron",
                        "professional": "Scholar",
                        "fantastic": "Wizard",
                        "description": "..."
                    },
                    {
                        "attribute": "Intuition",
                        "anatomic": "Sensation",
                        "civic": "Media",
                        "mythological": "Iris",
                        "professional": "Journalist",
                        "fantastic": "Scout",
                        "description": "..."
                    },
                    {
                        "attribute": "Justice",
                        "anatomic": "?",
                        "mythological": "Hades",
                        "professional": "Lawyer",
                        "fantastic": "?",
                        "description": ""
                    }
                ]
            }
        ])
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