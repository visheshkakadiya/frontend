import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <div>
            <Link to="/" className='flex gap-2 items-center'>
                <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: '#A855F7' }} />
                <span className='font-bold text-white'>YouTube</span>
            </Link>
        </div>
    );
}

export default Logo;
