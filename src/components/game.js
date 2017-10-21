import React from 'react';
import { connect } from 'react-redux';
import { update_game_id } from '../actions';

 const Game = props => {
     console.log('these are the prop from the Game creator', props)
     
    const {desc, date, time, title, vibe, game_id} = props.game_info;
    
    const handle_view_click = () => {
        props.update_game_id( game_id )
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
        auth: state.sports.auth,
        game_id: state.sports.game_id
    }
}

export default connect(mapStateToProps, { update_game_id })(Game)