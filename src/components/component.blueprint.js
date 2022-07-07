import React, { Component } from 'react';
import axios from 'axios';
import './css.blueprints.css';

class Blueprint extends Component {
    
    constructor(props) {
        super(props);
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getBlueprint = this.getBlueprint.bind(this);
        this.getEdgeCoordinates = this.getEdgeCoordinates.bind(this);
        this.getPathString = this.getPathString.bind(this);
        this.loadFunction = this.loadFunction.bind(this);
        this.loadFunctions = this.loadFunctions.bind(this);
        this.loadEdges = this.loadEdges.bind(this);
    
        this.nodesRef = React.createRef();

        this.state = {
            URL:'https://database-streamline-server.herokuapp.com/blueprints',
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

        return this.state.blueprint.nodes.map(node => {
            return <li className='object'
                key={node.object+' object'}
                >{node.object}</li>
        })
    }

    loadFunctions() {
        if (!this.state.blueprint.nodes || !this.nodesRef.current) {return;}

        const nodes = this.state.blueprint.nodes;
        const children = this.nodesRef.current.childNodes[0].childNodes;


        return Array.from({length:nodes.length-1},(_,i)=>i+1).map(i => {
            
            if (!children.length) {return;}

            let coords = this.getEdgeCoordinates(children[i-1],children[i]);

            return this.loadFunction(nodes[i],coords);
        });
    }

    loadFunction(node,coords) {
        if (!node) {return;}

        console.log(node.object +' -> '+coords);

        let xPos = (coords[0]+coords[2])/2
        let yPos = (coords[1]+coords[3])/2;

        return <li className='function'
            key={node.object+' function'}
            style={{
                left:xPos,
                top:yPos
            }}
            >{node.function}</li>
    }

    getEdgeCoordinates(source,sink) {
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
            <div>
                <h1>Blueprint: {this.state.blueprint.name}</h1>
                <div id='container'>
                    <div id='nodes'
                        ref={this.nodesRef}>
                        <ul id='objects'>{this.loadObjects()}</ul>
                        <ul id='functions'>{this.loadFunctions()}</ul>
                    </div>
                    <svg>
                        <path stroke='red'
                            stroke_width='10'
                            d={this.loadEdges()} />
                    </svg>
                </div>
            </div>
        );
    }
}
 
export default Blueprint;