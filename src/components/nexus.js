import { Link } from 'react-router-dom';
import './nexus.css';

function Nexus() {
    return ( <>
        <div id='container'>

        <Link className='portal'
                to='/inventory'>
                    Inventory
            </Link>
            <Link className='portal'
                to='/quests'>
                    Quest Feed
            </Link>

        </div>
    </>);
}
 
export default Nexus;