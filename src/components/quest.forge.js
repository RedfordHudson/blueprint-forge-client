import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './blueprints.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function QuestForge() {

    // === [ Constants ] ===

    const location = useLocation();
    // const URL = 'http://localhost:3001/';
    const URL = 'https://embryonia-server.herokuapp.com/';
    // const timeoutLength = 2000;
    
    const {classId: id,element,field,origin} = location.state;

    const [quest, updateQuest] = useState(() => {return []});

    // === [ Framework ] ===
    
    useEffect(() => {
        getQuest()
        
        /*
        window.addEventListener('resize',handleResize);

        return () => {

            // called whenever effect is cleaned up
            // in other words, before every instance where effect is called
            // ( in this case, whenever component is unmounted )

            // remove event listener to liberate and replenish memory
            window.removeEventListener('resize',handleResize);
        }
        */
    // eslint-disable-next-line
    }, [])

    /*
    const handleResize = () => {
        setTimeout(() => {updateQuest(quest)},timeoutLength)
        // console.log(window.innerWidth);
    }*/

    // === [ Framework ] ===

    const getQuest = () => {
        axios.get(URL+'quests/'+id)
            .then(quest => updateQuest(quest.data))
            .catch(error => console.error('ERROR: '+error));
    }

    const saveQuest = () => {
        console.log(id)
        axios.patch(URL+'quests/updateSeries/'+id,{series:quest.series});
    }

    // === [ Nodes ] ===

    const loadFunctionBranch = (series,prefix) => {
        if (!series) {return;}

        return <ul className='function_series'
            style={{justifyContent:'space-around'}}
            key={'function_ul'+prefix}
            id={'function_ul'+prefix}>
            {
                series.map( (node,index) => {
                    const identifier = prefix+'_'+index;
                    
                    if (typeof node.function != 'undefined') { // chain -> base case
                        return <li className={'function '+(node.complete ? 'complete' : 'incomplete')}
                            key={'function'+identifier}
                            id={'function'+identifier}>
                                <textarea type='text'
                                    value={node.function}
                                    onChange={editFunction} 
                                    onKeyUp={(e) => {
                                        const field = document.getElementById('function'+identifier).firstChild;
                                        field.style.height = 'auto';

                                        const height = e.target.scrollHeight;
                                        field.style.height = ''+height+'px';
                                    }}
                                    />
                                <DatePicker selected={Date.parse(node.deadline)}
                                    minDate={new Date()}
                                    isClearable
                                    className='date-picker'
                                    onChange={date => editDeadline(date,identifier)}/>
                               
                                {addCompleteButton(node,series,identifier)}
                                {addButtons(node,identifier,series)}
                            </li>
                    } else { // branch -> recursive call
                        return <div className='function_parallel'
                            key={'function_div'+identifier}
                            id={'function_div'+identifier}>
                            {node.parallel.map(element => element.series).map( (branch,level_index) => {
                                return loadFunctionBranch(branch,identifier+'_'+level_index);
                            })}
                        </div>
                    }
                })
            }
        </ul>
    }

    const addCompleteButton = (node, series, identifier) => {
        // skip if node is complete
        if (node.complete) {return;}

        const indices = identifier.split('_').filter(index => index).map(index => parseInt(index));
        const len = indices.length;
        const index = indices[len-1];

        if (index !== 0) { // node IS NOT first in series

            // skip if previous node is incomplete
            if (!series[index-1].complete) {return;}

        } else if (len > 1) { // node IS first in series, but not beginning
            
            // skip if previous node AT ROOT is incomplete
            
            let root = quest.series;
            for (let i = 1; i < len-2; i+=2) {
                root = root[indices[i-1]].parallel[indices[i]].series;}
            if (!root[indices[len-3]-1].complete) {return;}
        }

        return <div><button className='completeButton'
            onClick={completeFunction}>Complete</button></div>
    }

    const addButtons = (node, identifier, series) => {
        // skip if node is complete
        if (node.complete) {return;}

        const chainButton = <button className='chain'
            onClick={chainFunction}>Chain</button>
        const branchButton = <button className='branch'
            onClick={branchFunction}>Branch</button>
        const deleteButton = <button className='delete'
            onClick={deleteFunction}>Delete</button>;
        
        const indices = identifier.split('_').map(i => parseInt(i)).filter(s => !isNaN(s));
        const index = indices[indices.length-1]

        // last element -> none
        if (indices[0] === quest.series.length-1) {return;}

        // first element || both adjacent elements are branches -> chain
        else if (!indices[0] || (
            (index && series[index-1].function === undefined) &&
            (index < series.length-1 && series[index+1].function === undefined ))) {
                return <div>{chainButton}</div>}

        // not first element in series &&
        // last element in series || either adjacent elements are branches -> chain, delete
        else if ( index && ( index === series.length-1 || (
            series[index-1].function === undefined || series[index+1].function === undefined ))) {
            return <div>{chainButton}{deleteButton}</div>}

        // benign element -> all buttons
        else {return <div>{chainButton}{branchButton}{deleteButton}</div>}
    }
    
    const getIndices = (e,subElement=false) => {
        let id = e.target.parentElement;
        id = subElement ? id.parentElement.id : id.id;

        const regexp = /(_[0-9]+)+/g;
        return regexp.exec(id)[0].split('_').map(i => parseInt(i)).filter(s => !isNaN(s));   
    }

    const editDeadline = (date, identifier) => {
        const indices = identifier.split('_').map(i => parseInt(i)).filter(s => !isNaN(s));   

        let newQuest = {...quest}
        let node = newQuest.series[indices[0]]

        for (let i = 1; i < indices.length; i+=2) {
            node = node.parallel[indices[i]].series[indices[i+1]];}

        node.deadline = date ? date.toDateString() : date;
        updateQuest(newQuest)
    }

    const editFunction = (e) => {
        const indices = getIndices(e);

        let newQuest = {...quest}
        let node = newQuest.series[indices[0]]

        for (let i = 1; i < indices.length; i+=2) {
            node = node.parallel[indices[i]].series[indices[i+1]];}

        node.function = e.target.value;
        updateQuest(newQuest)
    }

    const chainFunction = (e) => {
        const indices = getIndices(e,true); // use id for parent element

        const newNode = {
            function:'',
            deadline:null,
            complete:false
        }

        let newQuest = {...quest};
        let series = newQuest.series

        for (let i = 1; i < indices.length; i+=2) {
            series = series[indices[i-1]].parallel[indices[i]].series;}

        series.splice(indices[indices.length-1]+1,0,newNode);
        
        // quest state -> objects DOM
        updateQuest(newQuest)

        // nodes DOM reference -> SVG, functions DOM
        // setTimeout(() => {updateQuest(newQuest)},timeoutLength)
    }

    const branchFunction = (e) => {
        const indices = getIndices(e,true); // use id for parent element
        const len = indices.length;

        let newQuest = {...quest};
        let root = newQuest.series;

        for (let i = 1; i < len-2; i+=2) {
            root = root[indices[i-1]].parallel[indices[i]].series;}

        let series = root;
        if (len > 1) {
            series = series[indices[len-3]].parallel[indices[len-2]].series;}
        const node = series[indices[len-1]];

        const index = indices[len - 1];

        if (!index) { // first element -> concatenate array, replace in root
            root[indices[len-3]].parallel.push(
                {
                    complete: false,
                    series: [{
                        function:'',
                        deadline:null,
                        complete:false
                    }] 
                }
            )
        } else { // intermediary element -> transform into array, replace in series
            const newNode = {
                complete: false,
                parallel: [
                    {
                        complete: false,
                        series: [
                            node
                        ]
                    }, {
                        complete: false,
                        series: [{
                            function:'',
                            deadline:null,
                            complete:false
                        }] 
                    }
                ]
            }

            series.splice(index,1,newNode);
        }

        // quest state -> objects DOM
        updateQuest(newQuest)

        // nodes DOM reference -> SVG, functions DOM
        // setTimeout(() => {updateQuest(newQuest)},timeoutLength)
    }

    const deleteFunction = (e) => {
        const indices = getIndices(e,true); // use id for parent element
        const len = indices.length;

        let newQuest = {...quest};
        let root = newQuest.series;

        for (let i = 1; i < len-2; i+=2) {
            root = root[indices[i-1]].parallel[indices[i]].series;}

        let series = root;
        if (len > 1) {
            series = series[indices[len-3]].parallel[indices[len-2]].series;}
        
        series.splice(indices[len-1],1);

        if (len > 1) { // element is above base chain
            const parallel = root[indices[len-3]].parallel;

            if (!series.length) { // series is empty -> remove series from root
                parallel.splice(indices[len-2],1);
            }

            if (parallel.length === 1) { // root has one array left -> replace array with remaining object at root
                root.splice(indices[len-3],1,parallel[0].series[0])
            } else if (parallel.every(container => container.complete)) {
                root[indices[len-3]].complete = true;}
        }

        // quest state -> objects DOM
        updateQuest(newQuest);

        // nodes DOM reference -> SVG, functions DOM
        // setTimeout(() => {updateQuest(newQuest)},timeoutLength)
    }

    const completeFunction = (e) => {
        const indices = getIndices(e,true); // use id for parent element
        const len = indices.length;

        let newQuest = {...quest};
        let root = newQuest;
        let seriesContainer = root;

        if (len > 1) {
            root = root.series[indices[0]];

            for (let i = 1; i < indices.length-2; i+=2) {
                root = root.parallel[indices[i]].series[indices[i+1]];}
            
            seriesContainer = root.parallel[indices[len-2]];
        }
        const node = seriesContainer.series[indices[len-1]];
        node.complete = true;

        // if node is last in seriesParent -> complete seriesParent (account for base chain)
        if (indices[len-1] === seriesContainer.series.length-1) {
            seriesContainer.complete = true;}

        // if all series in parallel are complete -> complete parallel
        if (len > 1 && root.parallel.every(container => container.complete)) {
            root.complete = true;}

        updateQuest(newQuest)
    }

    return (
        <div id='container'
            // ref={nodesRef}
            >
            <div id='frame-div'>
                <Link id='back'
                    to={'/'+origin}
                    state={{
                        element,
                        field,
                        type:'Quest'
                    }}>Back</Link>
                <p type='text'
                    >{quest?.name}</p>
                <button id='save'
                    onClick={saveQuest} >Save</button>
            </div>
            
            {loadFunctionBranch(quest?.series,'')}
            {/* <ul id='objects'>{this.tryObjectBranch(quest.series)}</ul> */}
            <svg>
                <path 
                    stroke='black'
                    stroke_width='10'
                    // d={tryPath()}
                    />
            </svg>
        </div>
    );

    

    /*
    // === [ Static Coordinate Getters ] ===

    const getEdgeCoordinates = (source,sink) => {
        if (!sink) {return;}

        const x1 = source.offsetLeft + source.clientWidth/2;
        const y1 = source.offsetTop + source.clientHeight/2;
        
        const x2 = sink.offsetLeft + sink.clientWidth/2;
        const y2 = sink.offsetTop + sink.clientHeight/2;

        return [x1,y1,x2,y2];
    }

    const getPathString = (coords) => {
        return 'M'+coords[0]+' '+coords[1]+' L'+coords[2]+' '+coords[3]+' ';}

    // === [ DOM References ] ===
    
    const nodesRef = useRef();

    const getReference = (indices) => {
        // optional chaining
        let reference = nodesRef.current?.childNodes?.[0]?.childNodes;

        for (let i = 0; i < indices.length-1; i+=2) {
            // reference = reference[indices[i]].childNodes[indices[i+1]].childNodes;}
            reference = reference[indices[i]]?.childNodes[indices[i+1]]?.childNodes;
        }

        return reference;
    }

    // === [ Edges ] === 

    const tryPath = () => {
        return '';
        
        if ( !( quest.nodes && getReference([]) ) ) {return '';}
        
        // return getPath(quest.nodes,[])

        try {
            console.log('##SUCCESS: Loading Edges')
            return getPath(quest.nodes,[])
        } catch (err) {
            console.log('##ERROR: '+err)
            // console.log(quest.nodes);
            // console.log(getReference([]));
            return '';
        }
    }

    const getPath = (nodes, indices) => {
        
        let pathString = '';
        
        const reference = getReference(indices);
        if (!reference) {return '';}

        // console.log('%cnodes','color:green')
        // console.log(nodes)
        // console.log('%creference','color:blue')
        // console.log(reference)

        for (let i = 1; i < nodes.length; i++) {
            if (nodes[i-1].object == undefined) { // source is Array -> conjunction
                nodes[i-1].forEach( (_,index) => {
                    // conjunction -> incoming edges

                    const source = reference[i-1]?.childNodes[index]?.lastChild; // last object in sub-series
                    if (!source) {return '';}

                    const sink = reference[i];
                    let coords = getEdgeCoordinates(source,sink);
                    getPathString(coords);
                    pathString += getPathString(coords);
                })

            } else if (nodes[i].object == undefined) { // sink is Array -> disjunction
                nodes[i].forEach( (branch,index) => {
                    const newIndices = indices.concat([i,index]);

                    
                    // console.log('%cindices','color:purple')
                    // console.log(indices + ' / ' + i + ' / ' + index)

                    // disjunction -> outgoing edges
                    const subReference = getReference(newIndices);
                    if (!subReference?.length) {return '';}
                    
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series

                    // console.log('%csubreference','color:red')
                    // console.log(subReference);

                    let coords = getEdgeCoordinates(source,sink);
                    getPathString(coords);
                    pathString += getPathString(coords);

                    // sub-series
                    pathString += getPath(branch,newIndices);
                })
            } else { // both are Nodes
                let coords = getEdgeCoordinates(reference[i-1],reference[i]);
                pathString += getPathString(coords);
            }
        }

        return pathString;
    }
    */
}
 
export default QuestForge;