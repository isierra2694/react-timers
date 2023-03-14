import { Link } from 'react-router-dom';

const CustomLink = ({ to, children, ...props }) => {
    return (
        <li>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}

export default CustomLink;