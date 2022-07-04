import React from 'react';
import axios from 'axios';
import './css.program.css';

export default class ProgramsDisplay extends React.Component {
    constructor(props) {
        super(props);

        // this.componentDidMount = this.componentDidMount.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
        this.logPrograms = this.logPrograms.bind(this);
        this.loadPrograms = this.loadPrograms.bind(this);

        this.state = {
            URL: 'https://database-streamline-server.herokuapp.com/programs',
            programs: [],
            img_dimensions:'100px'
        }
    }

    componentDidMount() {
        this.getPrograms();
                
    }

    getPrograms() {
        axios.get(this.state.URL)
            .then((programs_json) => {
                this.setState({
                    programs:programs_json.data
                });
            })
    }

    logPrograms() {
        console.log(this.state.programs);
    }

    loadSkills(program,skills) {
        return skills.map((skill) => {
            return <li key={program+'-'+skill}>{skill}</li>
        })
    }

    loadPrograms() {
        return this.state.programs.map(program => {
            return <li key={program.name+'-div'}
                className='card'>
                <p className='type'>{program.type}</p>
                <p className='name'>{program.name}</p>
                <img src={program.icon_URL}
                    width={this.state.img_dimensions}
                    height={this.state.img_dimensions}
                    // style={"float:right;width=${100}.px;height:${100}.px"}
                    alt={program.name} />
                    <ul>{this.loadSkills(program.name,program.skills)}</ul>
            </li>
        })
    }

    render() {
        return (
            <ul>
                {this.loadPrograms()}
            </ul>
        );
    }
}