import React, { useState } from 'react';
import './TipWindow.css';
import { Typography } from '@mui/material';

function TipWindow({ data, children }) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <div className="tipWindowContainer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {isHovered && 
                <div className="tipWindow">
                            <div>
                                <Typography variant='caption'>{data}</Typography>
                            </div>
                </div>
            }
            {children}
        </div>
    )
}

export default TipWindow;