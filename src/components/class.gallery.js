import axios from 'axios';
import './spaces.selector.css';

import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ClassGallery() {
    
    // === [ Constants ] ===

    const location = useLocation();

    const {element,field,type} = location?.state || {};

    // const URL = 'http://localhost:3001/';
    const URL = 'https://blueprint-forge-server.herokuapp.com/';
    const expressBuffer = 25;

    const [elements, updateElements] = useState(() => {return []})
    const [classes, updateClasses] = useState(() => {return []})
    const [types, updateTypes] = useState(() => {return []})

    const [currentElement, updateCurrentElement] = useState(() => {
        return element?element:'Energy'}); 
    const [currentAttribute, updateCurrentAttribute] = useState(() => {
        return field?field:'Strength'}); 
    const [currentType, updateCurrentType] = useState(() => {
        return type?type:'Player'}); 

    const [draggedClass, updateDraggedClass] = useState(() => {return ''}); 

    // const polygonObj = useRef();

    // === [ Framework ] ===

    useEffect(() => {
        getElements();
        getTypes();
        getClasses();
    // eslint-disable-next-line 
    },[]);

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
                        "attribute": "Energy",
                        "anatomic": "Cardio",
                        "civic": "Energy Sector",
                        "mythological": "",
                        "professional": "",
                        "fantastic": "",
                        "aesthetic": "",
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
                        "attribute": "Justice",
                        "anatomic": "?",
                        "mythological": "Anubis",
                        "professional": "Lawyer",
                        "fantastic": "?",
                        "description": ""
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
                        "attribute": "Craft",
                        "anatomic": "?",
                        "civic": "Design",
                        "mythological": "Minerva",
                        "professional": "Designer",
                        "fantastic": "?",
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
                    }
                ]
            },
            {
                "anatomic": "?",
                "civic": "?",
                "function": "Data",
                "element": "?",
                "attributes": [
                    {
                        "attribute": "Data Science",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Web 3",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Civic Tech",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Venture Capital",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Professional",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    },
                    {
                        "attribute": "Databases",
                        "anatomic": "?",
                        "civic": "?",
                        "mythological": "?",
                        "professional": "?",
                        "fantastic": "?",
                        "description": "..."
                    }
                ]
            }
        ])
    }

    const getTypes = () => {
        updateTypes([
            // 'Quest',
            'Player',
            'Enemy',
            'Space',
            'Service',
            'Event',
            'Equippable',
            'Consumable',
            'Collectible'
        ])
    }

    const getClasses = () => {
        axios.get(URL+'classes')
            .then(classes => {
                updateClasses(classes.data);
            })
    }
    
    // === [ DOM ] ===

    const elementNavbar = () => {
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

    const fieldNavbar = () => {
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

                        updateClassField()
                    }}     
                    >
                    <p>{name}</p>
                </li>
            }) }
        </ul>
    }

    const typeNavbar = () => {
        return <ul id='tertiaryNavbar'
            className='navbar'>
            { types.map(type => {
                return <li id={'type-'+type}
                    key={'type-'+type}
                    className={type === currentType ? 'selected' : ''}
                    onClick={() => updateCurrentType(type)}
                    
                    onDragOver={(e) => {
                        e.preventDefault()

                        updateCurrentType(e.target.innerText)
                    }}
                    onDrop={(e) => {
                        e.preventDefault();

                        updateClassType()
                    }}     
                    >
                    <p>{type}</p>
                </li>
            }) }
        </ul>
    }

    const loadClasses = () => {
        if (!classes.length) {return '';}

        let currentClasses = classes.filter(classItem => classItem.field===currentAttribute && classItem.type===currentType);

        return currentClasses.map(classItem => {
            const {name,picture_URL,_id,description,associationList} = classItem;

            return <div
                id={'class-'+name}
                key={'class-'+name}
                className='card-container'
                
                draggable='true'
                onDragStart={() => {
                    updateDraggedClass(classItem);
                }}
                >
                    <div className='card-title'>{name}</div>
                    <img className='card-image'
                        src={picture_URL}
                        alt=''/>
                    <div className='card-background' />
                    <div className='card-description'>{description}</div>
                    <div className='card-content'>
                        <Link className='link'
                            to={
                            (currentType==='quest')?'/blueprints':'/class'
                        }
                            state={{
                                classId:_id,
                                associationList,
                                element:currentElement,
                                field:currentAttribute,
                                type:currentType,
                                classType:name
                            }}>Expand</Link>
                        <button onClick={(e) => {
                            const state = e.target.nextElementSibling.style.visibility;
                            e.target.nextElementSibling.style.visibility = (!state || state === 'hidden') ? 'visible' : 'hidden'
                        }}
                        >Details</button>
                        <ul className='details'>
                            {loadClassDetails(classItem)}
                            
                            <button onClick={(e) => {
                                updateClass(classItem)
                                e.target.parentElement.style.visibility = 'hidden'   
                            }}>Save</button>
                            <button onClick={() => deleteClass(classItem)}>Delete</button>
                        </ul>
                    </div>
                </div>
        })
    }

    const updateClassField = () => {
        draggedClass.element = currentElement;
        draggedClass.field = currentAttribute;

        axios.patch(URL+'classes/update', draggedClass)
            .then(() => {setTimeout(getClasses,expressBuffer)});
    }

    const updateClassType = () => {
        draggedClass.type = currentType;

        axios.patch(URL+'classes/update', draggedClass)
            .then(() => {setTimeout(getClasses,expressBuffer)});
    }

    const updateClass = (classItem) => {
        axios.patch(URL+'classes/update', classItem)
            .then(() => {setTimeout(getClasses,expressBuffer)});
    }

    const deleteClass = (classItem) => {
        axios.delete(URL+'classes/delete/'+classItem._id)
            .then(() => {setTimeout(getClasses,expressBuffer)});
    }

    const loadClassDetails = (classItem) => {
        return ['name','picture_URL','description'].map(property => {
            return <li key={'class-property-'+property}>
                <p>{property}</p>
                <textarea type='text'
                    defaultValue={classItem[property]}
                    onChange={(e) => { 
                        classItem[property] = e.target.value;
                    }} />
            </li>
        })

    }
    
    const loadAddClass = () => {
        return <div id={'add'}
            key={'class-_add'}
            className='card'
            onClick={() => {
                const newClass = {
                    element:currentElement,
                    field:currentAttribute,
                    type:currentType,
                    name:'New Class',
                    associationList:[],
                    details: {},
                    picture_URL:'',
                    description:'Description'
                }

                axios.post(URL+'classes/add', newClass)
                .then(() => {setTimeout(getClasses,expressBuffer)});
            }}
            >
            {'+'}
        </div>
    }

    return ( <>
        <Link to='/spaces'>Spaces</Link>
        {elementNavbar()}
        {fieldNavbar()}
        <div id='container'>
            {loadClasses()}
            {loadAddClass()}
        </div>
        {typeNavbar()}
    </>);
}
 
export default ClassGallery;