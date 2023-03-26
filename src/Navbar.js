import { Link } from 'react-router-dom';
import CustomLink from './util/CustomLink';

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <div className="navbar-content">
                    <Link to="/react-timers/" className="site-logo">
                        <h2>react-timers</h2>
                    </Link>
                    <div className="nav-list">
                        <ul>
                            <CustomLink to="/react-timers/about">about</CustomLink>
                            <CustomLink to="https://github.com/isierra2694/react-timers">github</CustomLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Navbar;