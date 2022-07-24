import axios from 'axios';
import './spaces.selector.css';

import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as Icon from 'react-icons/ti';
import * as Icon2 from 'react-icons/im';
import * as GI from 'react-icons/gi';

function Inventory() {
    
    // === [ Constants ] ===

    const location = useLocation();
    const {element,field,type} = location?.state || {};

    // const URL = 'http://localhost:3001/';
    const URL = 'https://embryonia-server.herokuapp.com/';
    const expressBuffer = 25;

    const [elements, updateElements] = useState(() => {return []})
    const [types, updateTypes] = useState(() => {return []})
    
    const [classes, updateClasses] = useState(() => {return []})
    const [quests, updateQuests] = useState(() => {return []})

    const [currentElement, updateCurrentElement] = useState(() => {
        return element?element:'Energy'}); 
    const [currentAttribute, updateCurrentAttribute] = useState(() => {
        return field?field:'Strength'}); 
    const [currentType, updateCurrentType] = useState(() => {
        return type?type:'Quest'}); 

    const [draggedClass, updateDraggedClass] = useState(() => {return ''}); 

    // const polygonObj = useRef();

    // === [ Framework ] ===

    useEffect(() => {
        getElements();
        getTypes();
        getClasses();
        getQuests();
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
        updateTypes({
            Quest:<Icon.TiMap className='type-icon'/>,
            Player:<Icon.TiUserOutline className='type-icon'/>,
            Enemy:<GI.GiBoneGnawer className='type-icon'/>,
            Space:<Icon.TiGroupOutline className='type-icon'/>,
            Service:<Icon.TiCogOutline className='type-icon'/>,
            Event:<Icon2.ImTicket className='type-icon'/>,
            Skill:<GI.GiBoltSpellCast className='type-icon'/>,
            Equippable:<GI.GiBlackKnightHelm className='type-icon'/>,
            Consumable:<GI.GiApothecary className='type-icon'/>,
            Collectible:<Icon.TiGift className='type-icon'/>,
        })
    }

    const getClasses = () => {
        axios.get(URL+'classes')
            .then(classes => {
                updateClasses(classes.data);
            })
    }

    const getQuests = () => {
        axios.get(URL+'quests')
            .then(quests => {
                updateQuests(quests.data);
            })
    }
    
    // === [ Framework ] ===

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
            { Object.entries(types).map(type => {
                const [key,value] = type;

                return <li id={'type-'+key}
                    key={'type-'+key}
                    className={key === currentType ? 'selected' : ''}
                    onClick={() => updateCurrentType(key)}
                    
                    onDragOver={(e) => {
                        e.preventDefault()

                        if (currentType==='Quest') {return;}

                        let id = e.target;
                        if (id.tagName === 'path') {id = id.parentElement.parentElement}
                        else if (id.tagName === 'svg') {id = id.parentElement}
                        id = id.id.split('type-')[1];

                        updateCurrentType(id)
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        
                        if (currentType==='Quest') {return;}

                        let id = e.target;
                        if (id.tagName === 'path') {id = id.parentElement.parentElement}
                        else if (id.tagName === 'svg') {id = id.parentElement}
                        id = id.id.split('type-')[1];

                        updateClassType(id)
                    }}     
                    >
                    {value}
                </li>
            }) }
        </ul>
    }

    // === [ Content ] ===

    const loadClasses = () => {
        let currentClasses = currentType === 'Quest' ? quests : classes;
        
        if (!currentClasses.length) {return '';}

        currentClasses = currentClasses.filter(classItem => classItem.field === currentAttribute &&
            (currentType === 'Quest' || classItem.type === currentType));

        return currentClasses.map(classItem => {
            const {name,picture_URL,description} = classItem;

            return <div
                id={'class-'+name}
                key={'class-'+name}
                className={'card-container '+(classItem.status===1?'primed':'')}
                draggable='true'
                onDragStart={() => {
                    updateDraggedClass(classItem);}}>

                <div className='card-title'>{name}</div>
                <img className='card-image'
                    src={picture_URL}
                    alt=''/>
                <div className='card-background' />
                <div className='card-description'>{description}</div>
                <div className='card-content'>
                    {loadLink(classItem)}
                    <button onClick={(e) => {
                        const state = e.target.nextElementSibling.style.visibility;
                        e.target.nextElementSibling.style.visibility = (!state || state === 'hidden') ? 'visible' : 'hidden'
                    }}
                    >Details</button>
                    <ul className='details'>
                        {loadClassDetails(classItem)}
                        {loadClassSpecificDetails(classItem)}

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

    const loadLink = (classItem) => {
        const {name,_id, associationList} = classItem;

        return <Link className='link'
            to={(currentType==='Quest')?'/questForge':'/class'}
            state={{
                origin:'inventory',
                classId:_id,
                associationList,
                element:currentElement,
                field:currentAttribute,
                type:currentType,
                classType:name
            }}>Expand</Link>
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

    const loadClassSpecificDetails = (classItem) => {
        if (currentType !== ('Quest')) {return;}

        return <button onClick={(e) => {
                classItem.status = 1;
                updateClass(classItem)
                e.target.parentElement.style.visibility = 'hidden'   
            }}>Prime</button>
    }

    const renderClasses = () => {
        setTimeout(() => {
            if (currentType === 'Quest') {
                getQuests();
            } else {
                getClasses();}
        },expressBuffer)
    }

    const updateClassField = () => {
        draggedClass.element = currentElement;
        draggedClass.field = currentAttribute;

        axios.patch(URL+(currentType==='Quest'?'quests/updateMeta':'classes/update'), draggedClass)
            .then(renderClasses);
    }

    const updateClassType = () => {
        draggedClass.type = currentType;

        axios.patch(URL+'classes/update', draggedClass)
            .then(renderClasses);
    }

    const updateClass = (classItem) => {
        axios.patch(URL+(currentType==='Quest'?'quests/updateMeta':'classes/update'), classItem)
            .then(renderClasses);
    }

    const deleteClass = (classItem) => {
        if (currentType==='Quest') {console.log('deleting quest')}

        axios.delete(URL+(currentType==='Quest'?'quests':'classes')+'/delete/'+classItem._id)
            .then(renderClasses);
    }
    
    const loadAddClass = () => {
        return <div id={'add'}
            key={'class-_add'}
            className='card'
            onClick={() => {

                if (currentType==='Quest') {console.log('adding quest')}
                
                let newClass = '';
                
                if (currentType==='Quest') {
                    newClass = {
                        element:currentElement,
                        field:currentAttribute,
                        name: 'New Quest',
                        details: {},
                        picture_URL:'',
                        description:'Description',
                        status: 0,
                        priority: 3,
                        series: [
                            {
                                function:'Begin Adventure',
                                deadline:null,
                                complete:false
                            },{
                                function:'Complete Adventure',
                                deadline:null,
                                complete:false
                            }
                        ]
                    }
                } else {
                    newClass = {
                        element:currentElement,
                        field:currentAttribute,
                        type:currentType,
                        name:'New Class',
                        details: {},
                        picture_URL:'',
                        description:'Description',
                        associationList:[],
                    }       
                }

                axios.post(URL+(currentType==='Quest'?'quests':'classes')+'/add', newClass)
                    .then(renderClasses);
                }}
            >
            {'+'}
        </div>
    }

    return ( <>
        <div id='frame-div'
        style={{top:'0vh',width:'5vh'}}>
            <Link to='/spaces'>Spaces</Link>
            <Link id='back'to={'/'}>Back</Link>
        </div>
        {elementNavbar()}
        {fieldNavbar()}
        <div id='container'>


            {loadClasses()}
            {loadAddClass()}
        </div>
        {typeNavbar()}
    </>);
}
 
export default Inventory;