import React from 'react';

/**
 * @function Location_Display
 * @param {obj} props 
 * @returns react function component for displaying user location label
 */
export default function Location_Display(props) {
    if(props.history.location.pathname === '/your_games') {
        return (
            <div className='location-bar text-center'>
                <h2>Your Games</h2>
            </div>
        )
    }
    if(props.history.location.pathname === '/find_game') {
        return (
            <div className='location-bar text-center'>
                <h2>Find Game</h2>
            </div>
        )
    }    
}