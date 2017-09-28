import React from 'react';

export default props => {
    const {description, game_date, game_time, game_title, vibe} = props.game_info
    console.log('these be the props from game', props)
    return (
        <div className='single-game row'>
            <div className='col-3 textpad'>{description}</div>
            <div className='col-3 textpad'>{`${game_date} ${game_time}`}</div> 
            <div className='col-2 textpad'>{ vibe }</div>
            <div>
                <a href='#' className='btn btn-outline btn-xl viewbtn'>View</a>
            </div>
        </div>
    )
}