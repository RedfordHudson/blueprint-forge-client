import axios from 'axios';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './quest.feed.css'
import './blueprints.css'

function QuestFeed() {
    
    // === [ Constants ] ===

    // const URL = 'http://localhost:3001/';
    const URL = 'https://embryonia-server.herokuapp.com/';

    const [quests, updateQuests] = useState(() => { return [] });
    const [questsWithProgress, updateQuestsWithProgress] = useState(() => { return {urgent: [], nonUrgent: []} });

    // === [ Data ] ===
    
    useEffect(() => {
        getQuests();
    },[]);

    useEffect(() => {
        getQuestsWithProgress();
        // eslint-disable-next-line
    },[quests]);

    const getQuests = () => {
        axios.get(URL+'quests/')
            .then(quests => {
                updateQuests(quests.data.filter(quest => quest.status === 1));
            })
    }

    const getQuestsWithProgress = () => {
        let questsWithProgress = {
            urgent:[],
            nonUrgent:[]
        }

        quests.forEach(quest => {
            const [total, completed, current] = countProgress(quest.series);

            const questWithProgress = {...quest, total, completed, current};

            if (current.length) {
                questsWithProgress.urgent.push(questWithProgress);
            } else {
                questsWithProgress.nonUrgent.push(questWithProgress);
            }
        })

        updateQuestsWithProgress(questsWithProgress);
    }

    const countProgress = (series) => {

        let total = 0;
        let completed = 0;
        let current = [];

        series.forEach(node => {
            total += 1;

            if (node.function === undefined) { // source is Array -> conjunction
                node.parallel.forEach((node) => {
                    const progress = countProgress(node.series);
                    total += progress[0];
                    completed += progress[1];
                    current = current.concat(progress[2]);
                });
            } else {
                if (node.complete) {
                    completed += 1;
                } else if (node.deadline === new Date().toDateString()) { // node.deadline === today
                    current.push(node.function)
                }
            }
        })

        return [total, completed, current];
    }

    // === [ DOM ] ===

    const loadQuests = (renderUrgent) => {
        const {urgent, nonUrgent} = questsWithProgress;

        const currentQuests = renderUrgent ? urgent : nonUrgent;

        return currentQuests.map(quest => {
            const {name, picture_URL, description, _id, total, completed, current} = quest;

            return <div
                id={'quest-'+name}
                key={'quest-'+name}
                className={'card-container '+(renderUrgent?'urgent':'nonUrgent')}>

                <div className='card-title'>{name}</div>
                <img className='card-image'
                    src={picture_URL || ''}
                    alt=''/>
                <div className='card-background' />
                <div className='card-description'>{description}</div>
                <div className='card-content'>
                    <Link className='link'
                        to={'/questForge'}
                        state={{
                            classId:_id,
                            origin:'quests'
                        }}>{ (Math.round(completed/total * 10000) / 100) +'%'}</Link>
                </div>
                {urgent ? loadTasks(current) : ''}
            </div>
        })
    }

    const loadTasks = current => {
        return <div className='card-tasks'>
            <ul>{current.map(task => {
                return <li key={'task-'+task}>{task}</li>
            })}</ul>
        </div>
    }

    return (
        <div id='questFeed-container'>
            <div id='frame-div'>
                <Link id='back'
                    to={'/'}>Back
                </Link>
            </div>
            
            <div className='questFeed'
                id='urgent'>
                    <p>Urgent</p>
                    <ul>
                        {loadQuests(true)}
                    </ul>
            </div>
            
            <div className='questFeed'
                id='nonUrgent'>
                    <p>Not Urgent</p>
                    <ul>
                        {loadQuests(false)}
                    </ul>
            </div>
        </div>);
}
 
export default QuestFeed;