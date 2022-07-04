import React from 'react';
import axios from 'axios';

export default class ResourcesList extends React.Component { 
    constructor(props) {
        super(props);

        this.getResources = this.getResources.bind(this);
        this.getResourceElements = this.getResourceElements.bind(this);
        this.changeName = this.changeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            URL: 'https://database-streamline-server.herokuapp.com/resources',
            // URL: 'http://localhost:3001/resources',
            resources: [],
            name: ''
        }
    }

    componentDidMount() {
        this.getResources();
    }

    getResources() {
        axios.get(this.state.URL)
            .then((resourceData) => {
                this.setState({
                    resources:resourceData.data.map(resource => resource.name)
                });
            });
    }

    getResourceElements() {
        return this.state.resources.map(resource => {
            return <li key={resource}>{resource}</li>
        })
    }

    changeName(e) {
        this.setState({
            name:e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const resource = {
            name:this.state.name
        }

        console.log(resource);

        axios.post(this.state.URL+'/add',resource)
            .then(() => {
                this.getResources();
            })
    }

    render() {
        return (
            <div>
                <ul>{this.getResourceElements()}</ul>
                <form onSubmit={this.onSubmit}>
                    <input type='text'
                        onChange={this.changeName} />
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}