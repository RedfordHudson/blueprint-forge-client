import React, { Component } from 'react';
import axios from 'axios';
import './css.blueprints.css';

class Blueprint extends Component {
    
    constructor(props) {
        super(props);
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getBlueprint = this.getBlueprint.bind(this);
        this.saveBlueprint = this.saveBlueprint.bind(this);

        this.loadObjectBranch = this.loadObjectBranch.bind(this);
        this.addButtons = this.addButtons.bind(this);
        this.editObject = this.editObject.bind(this);
        this.chainObject = this.chainObject.bind(this);
        this.branchObject = this.branchObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);

        this.getEdgeCoordinates = this.getEdgeCoordinates.bind(this);
        this.getPathString = this.getPathString.bind(this);
        this.getReference = this.getReference.bind(this);

        this.tryPath = this.tryPath.bind(this);
        this.getPath = this.getPath.bind(this);

        this.loadFunctionBranch = this.loadFunctionBranch.bind(this);
        this.loadFunction = this.loadFunction.bind(this);
        this.editFunction = this.editFunction.bind(this);
        
        this.nodesRef = React.createRef();

        this.state = {
            URL:'https://database-streamline-server.herokuapp.com/blueprints/',
            blueprint:'',
        }
    }

    componentDidMount() {
        this.getBlueprint();
    }

    getBlueprint() {
        // get blueprint by id

        axios.get(this.state.URL)
            .then(blueprints => {
                this.setState({
                    blueprint:blueprints.data[1]
                })
            })
    }

    saveBlueprint() {
        const id = this.state.blueprint._id;
        axios.patch(this.state.URL+'update/'+id,this.state.blueprint);
    }

    loadObjectBranch(nodes,prefix) {
        if (!nodes) {return;}

        const objectsJSX = <ul className='object_series'
            style={{justifyContent:'space-around'}}
            key={'object_ul'+prefix}
            id={'object_ul'+prefix}>
            {
                nodes.map( (node,index) => {
                    const identifier = prefix+'_'+index;
                    
                    if (typeof node.object != 'undefined') { // chain -> base case
                        return <li className='object'
                            key={'object'+identifier}
                            id={'object'+identifier}>
                                <input type='text'
                                    value={node.object}
                                    onChange={this.editObject} />
                                {this.addButtons(identifier,nodes)}
                            </li>
                    } else { // branch -> recursive call
                        return <div className='object_parallel'
                            key={'object_div'+identifier}
                            id={'object_div'+identifier}>
                            {node.map( (branch,level_index) => {
                                return this.loadObjectBranch(branch,identifier+'_'+level_index);
                            })}
                        </div>
                    }
                })
            }
        </ul>

        
        return objectsJSX;
    }

    addButtons(identifier,series) {
        const chainButton = <button className='chain'
            onClick={this.chainObject}>Chain</button>
        const branchButton = <button className='branch'
            onClick={this.branchObject}>Branch</button>
        const deleteButton = <button className='delete'
            onClick={this.deleteObject}>Delete</button>;
        
        const indices = identifier.split('_').map(i => parseInt(i)).filter(s => !isNaN(s));
        // console.log(indices);
        const baseIndex = indices[0];
        const index = indices[indices.length-1]

        // last element -> none
        if (baseIndex === this.state.blueprint.nodes.length-1) {return <div/>;}
        // first element || both adjacent elements are branches -> chain
        else if (!baseIndex || (
            (index && typeof series[index-1].object == 'undefined') &&
            (index < series.length-1 && typeof series[index+1].object == 'undefined') ) ) {return <div>{chainButton}</div>}
        // not first element in series &&
        // last element in series || either adjacent elements are branches -> chain, delete
        else if ( index && ( index === series.length-1 || (
            typeof series[index-1].object == 'undefined' ||
            typeof series[index+1].object == 'undefined'
        ))) {return <div>{chainButton}{deleteButton}</div>}
        // benign element -> all buttons
        else {return <div>{chainButton}{branchButton}{deleteButton}</div>}
    }

    getIndices(e,subElement=false) {
        let id = e.target.parentElement;
        id = subElement ? id.parentElement.id : id.id;

        const regexp = /(_[0-9]+)+/g;
        const indices = regexp.exec(id)[0].split('_').map(i => parseInt(i)).filter(s => !isNaN(s));
        
        return indices;
    }

    editObject(e) {
        let blueprint = {...this.state.blueprint};
        const indices = this.getIndices(e);
        let node = blueprint.nodes[indices[0]]

        for (let i = 1; i < indices.length; i+=2) {
            node = node[indices[i]][indices[i+1]];}

        node.object = e.target.value;
        this.setState({blueprint:blueprint})
    }

    chainObject(e) {
        const newNode = {
            object:'',
            function:''
        }

        let blueprint = {...this.state.blueprint};
        const indices = this.getIndices(e,true); // use id for parent element

        let nodes = blueprint.nodes

        for (let i = 1; i < indices.length; i+=2) {
            nodes = nodes[indices[i-1]][indices[i]];}

        nodes.splice(indices[indices.length-1]+1,0,newNode);

        this.setState({blueprint:blueprint}, function() {
            this.setState({blueprint:blueprint})
        })    
    }

    branchObject(e) {
        let blueprint = {...this.state.blueprint};

        const indices = this.getIndices(e,true); // use id for parent element
        const len = indices.length;
        let root = blueprint.nodes;

        for (let i = 1; i < len-2; i+=2) {
            root = root[indices[i-1]][indices[i]];}

        let series = root;
        if (len > 1) {
            series = series[indices[len-3]][indices[len-2]];}
        const node = series[indices[len-1]];

        const index = indices[len - 1];

        if (!index) { // first element -> concatenate array, replace in root
            const newNode = root[indices[len-3]].concat(
                [[
                    {
                        object:'',
                        function:'',
                    }
                ]]
            )

            root.splice(indices[len-3],1,newNode);
        } else if (index === series.length-1) { // last element -> prevent
            alert('nope');
            return;
        } else if (typeof series[index-1].object == 'undefined' ||
          typeof series[index+1].object == 'undefined') { // either adjacent elements are disjunctions -> prevent
            alert('nope');
            return;
        } else { // chain element -> transform into array, replace in series
            const newNode = [
                [
                    node
                ],[
                    {
                        object:'',
                        function:'',
                    }
                ]
            ]

            series.splice(index,1,newNode);
        }

        this.setState({blueprint:blueprint}, function() {
            this.setState({blueprint:blueprint})
        })
    }

    deleteObject(e) {
        let blueprint = {...this.state.blueprint};

        const indices = this.getIndices(e,true); // use id for parent element
        const len = indices.length;
        let root = blueprint.nodes;

        for (let i = 1; i < len-2; i+=2) {
            root = root[indices[i-1]][indices[i]];}

        let series = root;
        if (len > 1) {
            series = series[indices[len-3]][indices[len-2]];}
        const index = indices[len - 1];

        // both adjacent elements are disjunctions -> prevent
        if ( (index && typeof series[index-1].object == 'undefined') &&
          (index < series.length-1 && typeof series[index+1].object == 'undefined') ) {
            alert('nope');
            return;
        }
        
        series.splice(indices[len-1],1);

        if (len > 1) { // element is above base chain
            if (!series.length) { // series is empty -> remove series from root
                root[indices[len-3]].splice(indices[len-2],1);
            }

            if (root[indices[len-3]].length === 1) { // root has one array left -> replace array with remaining object at root
                root.splice(indices[len-3],1,root[indices[len-3]][0][0])
            }
        }

        this.setState({blueprint:blueprint}, function() {
            this.setState({blueprint:blueprint})
        })
    }

    getEdgeCoordinates(source,sink) {
        if (!sink) {return;}

        const x1 = source.offsetLeft + source.clientWidth/2;
        const y1 = source.offsetTop + source.clientHeight/2;
        
        const x2 = sink.offsetLeft + sink.clientWidth/2;
        const y2 = sink.offsetTop + sink.clientHeight/2;

        return [x1,y1,x2,y2];
    }

    getPathString(coords) {
        return 'M'+coords[0]+' '+coords[1]+' L'+coords[2]+' '+coords[3]+' ';}

    getReference(indices) {
        let reference = this.nodesRef.current.childNodes[0].childNodes;

        for (let i = 0; i < indices.length-1; i+=2) {
            reference = reference[indices[i]].childNodes[indices[i+1]].childNodes;}

        return reference;
    }

    tryPath(nodes) {
        if (!nodes || !this.nodesRef.current || !this.nodesRef.current.childNodes ||
            !this.nodesRef.current.childNodes.length ||
            !this.getReference([]) ) {return '';}
        
        try {
            return this.getPath(nodes,[])
        } catch (err) {
            console.log('##ERROR: '+err)
        }
    }

    getPath(nodes, indices) {
        let pathString = '';
        let reference = '';

        for (let i = 1; i < nodes.length; i++) {
            if (typeof nodes[i-1].object == 'undefined') { // source is Array -> conjunction
                nodes[i-1].forEach( (_,index) => {
                    reference = this.getReference(indices);

                    // conjunction -> incoming edges
                    const source = reference[i-1].childNodes[index].lastChild; // last object in sub-series
                    
                    const sink = reference[i];
                    let coords = this.getEdgeCoordinates(source,sink);
                    this.getPathString(coords);
                    pathString += this.getPathString(coords);
                })

            } else if (typeof nodes[i].object == 'undefined') { // sink is Array -> disjunction
                nodes[i].forEach( (branch,index) => {
                    reference = this.getReference(indices);
                    const newIndices = indices.concat([i,index]);

                    // disjunction -> outgoing edges
                    const subReference = this.getReference(newIndices);
                    
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series
                    let coords = this.getEdgeCoordinates(source,sink);
                    this.getPathString(coords);
                    pathString += this.getPathString(coords);

                    // sub-series
                    pathString += this.getPath(branch,newIndices);
                })
            } else { // both are Nodes
                reference = this.getReference(indices);
                let coords = this.getEdgeCoordinates(reference[i-1],reference[i]);
                pathString += this.getPathString(coords);
            }
        }

        return pathString;
    }

    tryFunctionBranch(nodes) {
        if (!nodes || !this.nodesRef.current || !this.nodesRef.current.childNodes ||
            !this.nodesRef.current.childNodes.length ||
            !this.getReference([]) ) {return '';}
        
        try {
            return this.loadFunctionBranch(nodes,'')
        } catch (err) {
            console.log('##ERROR: '+err)
        }
    }

    loadFunctionBranch(nodes, identifier) {
        let reference = '';
        const indices = identifier.split('_').map(i => parseInt(i)).filter(s => !isNaN(s));

        const functionJSX = Array.from({length:nodes.length-1},(_,i)=>i+1).map(i => {
            if (typeof nodes[i-1].object == 'undefined') { // source is Array -> conjunction
                return nodes[i-1].map( (_,index) => {
                    return [];
                })

            } else if (typeof nodes[i].object == 'undefined') { // sink is Array -> disjunction
                return nodes[i].map( (branch,index) => {

                    reference = this.getReference(indices);
                    const newIndices = indices.concat([i,index]);

                    // disjunction -> outgoing edges
                    const subReference = this.getReference(newIndices);
                    
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series
                    let coords = this.getEdgeCoordinates(source,sink);
                    
                    return <div
                        key={'function_div'+identifier}
                        id={'function_div'+identifier}>
                        {/* outgoing edge */}
                        {this.loadFunction(nodes[i][index][0],coords,identifier+'_0')}
                        {/* sub-series */}
                        {this.loadFunctionBranch(branch,subReference,identifier)}
                    </div>
                })
            } else { // both are Nodes
                reference = this.getReference(indices);
                let coords = this.getEdgeCoordinates(reference[i-1],reference[i]);
                return this.loadFunction(nodes[i],coords,identifier+'_'+i);
            }
        });

        return functionJSX;
    }

    loadFunctionBranch(nodes, reference='', prefix='') {
        if (!this.nodesRef.current || !nodes ) {return;}

        if (!reference) {
            reference = this.nodesRef.current.childNodes[0].childNodes;}
        if (!reference.length) {return;}

        const functionJSX = Array.from({length:nodes.length-1},(_,i)=>i+1).map(i => {
            if (typeof nodes[i-1].object == 'undefined') { // source is Array -> conjunction
                return nodes[i-1].map( (_,index) => {
                    return [];
                })

            } else if (typeof nodes[i].object == 'undefined') { // sink is Array -> disjunction
                return nodes[i].map( (branch,index) => {
                    // disjunction -> outgoing edges
                    const subReference = reference[i].childNodes[index].childNodes;
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series
                    let coords = this.getEdgeCoordinates(source,sink);

                    const identifier = prefix+'_'+i+'_'+index;

                    return <div
                        key={'function_div'+identifier}
                        id={'function_div'+identifier}>
                        {/* outgoing edge */}
                        {this.loadFunction(nodes[i][index][0],coords,identifier+'_0')}
                        {/* sub-series */}
                        {this.loadFunctionBranch(branch,subReference,identifier)}
                    </div>
                })
            } else { // both are Nodes
                let coords = this.getEdgeCoordinates(reference[i-1],reference[i]);
                return this.loadFunction(nodes[i],coords,prefix+'_'+i);
            }
        });

        return functionJSX;
    }

    loadFunction(node,coords,identifier) {
        if (!node || !coords) {return;}

        let xPos = (coords[0]+coords[2])/2
        let yPos = (coords[1]+coords[3])/2;

        const extendedIdentifier = (identifier === 1) ? 'function_1' : 'function'+identifier;

        return <li className='function'
            key={extendedIdentifier}
            id={extendedIdentifier}
            style={{
                left:xPos,
                top:yPos
            }}
            ><input type='text'
            value={node.function}
            onChange={this.editFunction} /></li>
    }

    editFunction(e) {
        let blueprint = {...this.state.blueprint};
        const indices = this.getIndices(e);
        let node = blueprint.nodes[indices[0]]

        for (let i = 1; i < indices.length; i+=2) {
            node = node[indices[i]][indices[i+1]];}

        node.function = e.target.value;
        this.setState({blueprint:blueprint});
    }

    render() { 
        return ( 
            <div id='component'>
                <button className='save'
                    onClick={this.saveBlueprint}>Save</button>
                <h1>Blueprint: {this.state.blueprint.name}</h1>
                <div id='container'>
                    <div id='nodes'
                        ref={this.nodesRef}>
                        {this.loadObjectBranch(this.state.blueprint.nodes,'')}
                        <ul id='functions'>{this.tryFunctionBranch(this.state.blueprint.nodes)}</ul>
                    </div>
                    <svg>
                        <path 
                            stroke='black'
                            stroke_width='10'
                            d={this.tryPath(this.state.blueprint.nodes)} />
                    </svg>
                </div>
            </div>
        );
    }
}
 
export default Blueprint;