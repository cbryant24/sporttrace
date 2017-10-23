import React from 'react';
import { connect } from 'react-redux';
import { update_game_id } from '../actions';

 const Game = props => {
     
    const {game_description, game_date, game_time, game_title, game_vibe, id} = props.game_info;
    
    const handle_view_click = () => {
        props.update_game_id( id )
    }
    
    return (
        <div className='single-game row'>
            <div className='col-3 textpad'>{game_title}</div>
            <div className='col-3 textpad'>{`${game_date} ${game_time}`}</div> 
            <div className='col-2 textpad'>{ game_vibe }</div>
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