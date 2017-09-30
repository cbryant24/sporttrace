import React from 'react';

export default props => {
    const {description, game_date, game_time, game_title, vibe} = props.game_info
    return (
        <div className='single-game row'>
            <div className='col-3 textpad'>{game_title}</div>
            <div className='col-3 textpad'>{`${game_date} ${game_time}`}</div> 
            <div className='col-2 textpad'>{ vibe }</div>
            <div className='col-4'>
                <button className='btn btn-outline btn-xl viewbtn'>View</button>
            </div>
        </div>
    )
}