import React, { Component } from 'react';
import axios from 'axios';
import './css.blueprints.css';

class Blueprint extends Component {
    
    constructor(props) {
        super(props);
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getBlueprint = this.getBlueprint.bind(this);
        
        this.saveBlueprint = this.saveBlueprint.bind(this);

        this.addButtons = this.addButtons.bind(this);
        this.editObject = this.editObject.bind(this);
        this.chainObject = this.chainObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);

        this.loadFunctions = this.loadFunctions.bind(this);
        this.loadFunction = this.loadFunction.bind(this);
        this.editFunction = this.editFunction.bind(this);

        this.getEdgeCoordinates = this.getEdgeCoordinates.bind(this);
        this.getPathString = this.getPathString.bind(this);
        this.loadEdges = this.loadEdges.bind(this);
    
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
                    blueprint:blueprints.data[0]
                })
            })
    }

    loadObjects() {
        if (!this.state.blueprint.nodes) {return;}

        return this.state.blueprint.nodes.map( (node,index) => {
            return <li className='object'
                key={'object_'+index}
                id={'object_'+index}>
                    <input type='text'
                        value={node.object}
                        onChange={this.editObject} />
                    {this.addButtons(index)}
                </li>
        })
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

    loadFunctions() {
        if (!this.state.blueprint.nodes || !this.nodesRef.current) {return;}

        const nodes = this.state.blueprint.nodes;
        const children = this.nodesRef.current.childNodes[0].childNodes;

        return Array.from({length:nodes.length-1},(_,i)=>i+1).map(i => {
            if (!children.length) {return [];}

            let coords = this.getEdgeCoordinates(children[i-1],children[i]);

            return this.loadFunction(nodes[i],coords,i);
        });
    }

    loadFunction(node,coords,index) {
        if (!node || !coords) {return;}

        let xPos = (coords[0]+coords[2])/2
        let yPos = (coords[1]+coords[3])/2;

        return <li className='function'
            key={'function_'+index}
            id={'function_'+index}
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

    loadEdges() {
        if (!this.nodesRef.current) {return ''}

        const children = this.nodesRef.current.childNodes[0].childNodes;

        let pathString = '';

        for (let i = 1; i < children.length; i++) {
            let coordinates = this.getEdgeCoordinates(children[i-1],children[i]);
            pathString += this.getPathString(coordinates);
        }

        return pathString;
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
                        <ul id='objects'
                            style={{justifyContent:'space-around'}}
                            >{this.loadObjects()}</ul>
                        <ul id='functions'>{this.loadFunctions()}</ul>
                    </div>
                    <svg>
                        <path stroke='black'
                            stroke_width='1'
                            d={this.loadEdges()} />
                    </svg>
                </div>
            </div>
        );
    }
}
 
export default Blueprint;