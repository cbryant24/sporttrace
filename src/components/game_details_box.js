import React from 'react';


export default props => {
    return (
        <div className='gameinfobox'>
            <h3>{props.title}</h3>
            <p>{props.game_info}</p>
            <p>{props.game_time} </p>
        </div>
    )
}



<div className="col-lg-4 col-12">
                        <div className="gameinfobox">
                            <h3>Game Title</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor.
                                </p>
                            <h6>12/2/17 4:00PM</h6>
                                <button className="btn btn-outline btn-xl joinbtn">Join Game</button>

                        </div>
                    </div>