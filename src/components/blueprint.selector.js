import React, { Component } from 'react';
import axios from 'axios';
import './blueprint.selector.css';

import { Link } from 'react-router-dom';

class BlueprintSelector extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getBlueprints = this.getBlueprints.bind(this);
        this.loadBlueprints = this.loadBlueprints.bind(this);

        this.state = { 
            URL:'https://database-streamline-server.herokuapp.com/blueprints/',
            blueprints:[],
        }
    }

    componentDidMount() {
        this.getBlueprints();
    }

    getBlueprints() {
        axios.get(this.state.URL)
            .then(data => {
                this.setState({
                    blueprints:data.data
                })
            })
    }

    routeToBlueprint(e) {
        const name = e.target.id.split('blueprint-')[1];
        console.log(name);
    }

    loadBlueprints(add) {
        let names = ['_add'];

        if (!add) {
            names = this.state.blueprints.map(blueprint => blueprint.name)}

        return names.map(name => {
            return <Link to={'/blueprint/'+name}
                state={{ name: name }}
                id={'blueprint-'+name}
                key={'blueprint-'+name}
                className={add ? 'add card' : 'card'} 
                onClick={this.routeToBlueprint}>
                    {add ? '+' : name}
                </Link>
        })
    }

    render() { 
        return ( 
            <div id='container'>
                {this.loadBlueprints(false)}
                {this.loadBlueprints(true)}
            </div>
        );
    }
}
 
export default BlueprintSelector;