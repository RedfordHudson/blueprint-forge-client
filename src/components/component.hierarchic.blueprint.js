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
        this.deleteObject = this.deleteObject.bind(this);

        this.getEdgeCoordinates = this.getEdgeCoordinates.bind(this);
        this.getPathString = this.getPathString.bind(this);
        this.getPath = this.getPath.bind(this);

        this.loadFunctionBranch = this.loadFunctionBranch.bind(this);
        this.loadFunction = this.loadFunction.bind(this);
        this.editFunction = this.editFunction.bind(this);
    
        this.nodesRef = React.createRef();
        this.svgRef = React.createRef();

        this.state = {
            URL:'https://database-streamline-server.herokuapp.com/blueprints/',
            blueprint:'',
            // path:''
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

    loadObjectBranch(nodes,prefix) {
        if (!nodes) {return;}

        return <ul className='object_series'
            style={{justifyContent:'space-around'}}>
            {
                nodes.map( (node,index) => {
                    const identifier = prefix+'_'+index;
                    
                    if (node.object) { // chain -> base case
                        return <li className='object'
                            key={'object'+identifier}
                            id={'object'+identifier}>
                                <input type='text'
                                    value={node.object}
                                    onChange={this.editObject} />
                                {this.addButtons(index)}
                            </li>
                    } else { // branch -> recursive call
                        return <div className='object_parallel'
                            key={'branch'+identifier}
                            id={'branch'+identifier}>
                            {node.map(branch => {
                                return this.loadObjectBranch(branch,identifier);
                            })}
                        </div>
                    }
                })
            }
        </ul>
    }

    addButtons(index) {
        const chainButton = <button className='chain'
            onClick={this.chainObject}>Chain</button>
        const deleteButton = <button className='delete'
            onClick={this.deleteObject}>Delete</button>;


        if (!index) {return <div>{chainButton}</div>}
        else if (index === this.state.blueprint.nodes.length-1) {return <div/>;}
        else {return <div>{chainButton}{deleteButton}</div>}
    }

    saveBlueprint() {
        const id = this.state.blueprint._id;
        axios.patch(this.state.URL+'update/'+id,this.state.blueprint);
    }

    getIndex(e,subElement=false) {
        let id = e.target.parentElement;

        if (subElement) {
            id = id.parentElement.id;
        } else {
            id = id.id;
        }

        const indexFinder = /(object|function)_([0-9]+)/g;
        const index = indexFinder.exec(id)[2];
        return parseInt(index);
    }

    editObject(e) {
        let blueprint = {...this.state.blueprint};
        blueprint.nodes[this.getIndex(e)].object = e.target.value;
        this.setState({blueprint:blueprint})
    }

    chainObject(e) {
        const node = {
            object:'',
            function:''
        }

        let blueprint = {...this.state.blueprint};
        blueprint.nodes.splice(this.getIndex(e,true)+1,0,node);
        this.setState({blueprint:blueprint}, function() {
            this.setState({blueprint:blueprint})
        })
    }

    deleteObject(e) {
        let blueprint = {...this.state.blueprint};
        blueprint.nodes.splice(this.getIndex(e,true),1);
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

    getPath(nodes, reference='') {
        if (!this.nodesRef.current || !nodes ) {return;}

        if (!reference) {
            reference = this.nodesRef.current.childNodes[0].childNodes;}
        if (!reference.length) {return;}
        
        let pathString = '';

        for (let i = 1; i < nodes.length; i++) {
            if (!nodes[i-1].object) { // source is Array -> conjunction
                nodes[i-1].forEach( (_,index) => {
                    // conjunction -> incoming edges
                    const source = reference[i-1].childNodes[index].lastChild; // last object in sub-series
                    const sink = reference[i];
                    let coords = this.getEdgeCoordinates(source,sink);
                    pathString += this.getPathString(coords);
                })

            } else if (!nodes[i].object) { // sink is Array -> disjunction
                nodes[i].forEach( (branch,index) => {
                    // disjunction -> outgoing edges
                    const subReference = reference[i].childNodes[index].childNodes;
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series
                    let coords = this.getEdgeCoordinates(source,sink);
                    pathString += this.getPathString(coords);

                    // sub-series
                    pathString += this.getPath(branch,subReference);
                })
            } else { // both are Nodes
                let coords = this.getEdgeCoordinates(reference[i-1],reference[i]);
                pathString += this.getPathString(coords);
            }
        }

        return pathString;
    }

    loadFunctionBranch(nodes, reference='') {
        if (!this.nodesRef.current || !nodes ) {return;}

        if (!reference) {
            reference = this.nodesRef.current.childNodes[0].childNodes;}
        if (!reference.length) {return;}

        return Array.from({length:nodes.length-1},(_,i)=>i+1).map(i => {
            if (!nodes[i-1].object) { // source is Array -> conjunction
                return nodes[i-1].map( (_,index) => {
                    return;
                })

            } else if (!nodes[i].object) { // sink is Array -> disjunction
                return nodes[i].map( (branch,index) => {
                    // disjunction -> outgoing edges
                    const subReference = reference[i].childNodes[index].childNodes;
                    const source = reference[i-1];
                    const sink = subReference[0]; // first object in sub-series
                    let coords = this.getEdgeCoordinates(source,sink);

                    return <div>
                        {/* outgoing edge */}
                        {this.loadFunction(nodes[i][index][0],coords,i)}
                        {/* sub-series */}
                        {this.loadFunctionBranch(branch,subReference)}
                    </div>
                })
            } else { // both are Nodes
                let coords = this.getEdgeCoordinates(reference[i-1],reference[i]);
                return this.loadFunction(nodes[i],coords,i);
            }
        });
    }

    loadFunction(node,coords,identifier) {
        if (!node || !coords) {return;}

        let xPos = (coords[0]+coords[2])/2
        let yPos = (coords[1]+coords[3])/2;

        return <li className='function'
            key={'function_'+identifier}
            id={'function_'+identifier}
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
        blueprint.nodes[this.getIndex(e)].function = e.target.value;
        this.setState({blueprint:blueprint})
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
                        <ul id='functions'>{this.loadFunctionBranch(this.state.blueprint.nodes)}</ul>
                    </div>
                    <svg ref={this.svgRef}>
                    <path 
                        stroke='black'
                        stroke_width='1'
                        d={this.getPath(this.state.blueprint.nodes)} />
                    </svg>
                </div>
            </div>
        );
    }
}
 
export default Blueprint;