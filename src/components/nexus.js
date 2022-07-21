import { Link } from 'react-router-dom';
import './nexus.css';

function Nexus() {
    
    

    return ( <>
        <div id='container'>

        <Link className='portal'
                to='/blueprints'>
                    Blueprints
            </Link>
            <Link className='portal'
                to='/spaces'>
                    Spaces
            </Link>

        </div>
    </>);
}
 
export default Nexus;