import React from 'react';
import { connect } from 'react-redux';
import { get_single_game } from '../actions';

 const Game = props => {
     console.log('these are the prop from the Game creator 11:37pm', props)
     
    const {desc, date, time, title, vibe} = props.game_info;
    
    const handle_view_click = () => {
        props.get_single_game(game_id)
        
    }

    return (
        <div className='single-game row'>
            <div className='col-3 textpad'>{title}</div>
            <div className='col-3 textpad'>{`${date} ${time}`}</div> 
            <div className='col-2 textpad'>{ vibe }</div>
            <div className='col-4'>
                <button onClick={ () => handle_view_click() } className='btn btn-outline btn-xl viewbtn'>View</button>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_single_game})(Game)