import React, { Component } from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import Search_Bar from './map_searchbar';
import { connect } from 'react-redux';
import axios from 'axios';
import Post_Game_Modal from './sports_modal';
import { open_close_modal, selected_game, open_close_form, update_lat_long } from '../actions'
import { renderInput, renderCheckBox, renderSelect, format_date, format_time, validate } from './helpers';


class PostGameForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flashing_error: false,
            edit_game: this.props.edit_game
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.flashing_error && nextProps.location.lat )
            this.setState({ flashing_error: false})
        
    }
    handleFormVals(vals) {
        if(!this.props.location.lat) {
            this.setState({
                flashing_error: true
            })
            return
        }
        debugger
        const game_milliseconds = new Date(`${vals.date} ${vals.time}`).getTime()
        const complete_game = {
            game_date: game_milliseconds,
            formatted_date: `${format_date({data_type: 'mm-dd-yyyy', type: 'set', game_milliseconds})}, ${format_time({data_type: 'hh:mm', type: 'set', game_milliseconds}) }`,
            game_description: vals.description,
            game_title: vals.title,
            game_vibe: vals.vibe,
            lat: this.props.location.lat,
            lon: this.props.location.lon,
            zip: this.props.location.zipcode,
            ball: vals.ball,
            address: this.props.location.address,
            address_url: this.props.location.address_url,
            place_id: this.props.location.place_id,
            city: this.props.location.city,
            fb_id: this.props.auth.fb_id
        }

        this.props.selected_game(complete_game);
        this.props.open_close_modal({open: true, type: 'confirmation'});
        
    };    

    handle_cancel() {
        this.props.reset();
        this.props.update_lat_long({})
        this.props.open_close_form(false)
        if(this.props.history.location.pathname === '/post_game')
            this.props.history.push('/')
    }

    render() {
        debugger
        const {handleSubmit, pristine, submitting, error} = this.props;            

        return (
            <div>
                <Post_Game_Modal title='Create Game' history={this.props.history}/>
                 <form onSubmit={ handleSubmit((vals)=> this.handleFormVals(vals))}>
                    <div className="row">
                        <div className={ this.props.history.location.pathname === '/your_games' ? 'col-12':'col-sm-6 col-12'}>
                        <Field name="title" component={renderInput} label="Title"  className="game_title_input" type="text" placeholder="Your Title"/>
                        <Field name="time" component={renderInput} label="Time" type="time"   className="game_time_input" placeholder="Game Time"/>
                        <Field name="date" component={renderInput} label="Date" type="date" className="game_time_input" placeholder="Game Time"/>
                        </div>
                        <div className={ this.props.history.location.pathname === '/your_games' ? 'col-12':'col-sm-6 col-12'}>
                        <Field name="vibe" component={renderSelect} label="Vibe" type="select" className="game_vibe_input form-control" />
                        <Field name="ball" component={renderCheckBox} label="Ball" type="checkbox" className="game_vibe_input" />
                        <div className='form-group'>
                            <Search_Bar reset_vals='nothin'/>
                            {this.state.flashing_error ? <div className='text-center flashing-error'>Please Enter a valid location</div>: ''}
                        </div>
                        <Field name='description' component={renderInput} label="Description" type="text-area" className="game_description_input" placeholder="Your Description"/>
                        </div>
                    </div>
                    <button disabled={this.props.auth.fb_id ? false : true} type="submit"  className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</button>
                    <button onClick={() => this.handle_cancel()} type='button' className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Cancel</button>
                 </form>
            </div>

        )
    }
};

//use on from to prevent from submission
// disabled={pristine || submitting }





function mapStateToProps(state, props) {
    let initialValues = {}
    if(props.selection && props.selection.length > 0) {
        const time = format_time({data_type: 'hh:mm', type: 'current'})
        const current_date = format_date({data_type: 'yyyy-mm-dd', type: 'current'})
        const edit_date = format_date({data_type: 'yyyy-mm-dd', type: 'set', game_milliseconds: props.selection[0].game_date})
        const edit_time = format_time({data_type: 'hh:mm', type: 'set', game_milliseconds:props.selection[0].game_date})
        initialValues = {
            title: props.selection[0].game_title,
            time: edit_time,
            date: edit_date,
            vibe: props.selection[0].game_vibe,
            description: props.selection[0].game_description,
            ball: props.selection[0].ball,
        }
    }
    return {
        location: state.sports.lat_lon,
        auth: state.sports.auth,
        selection: props.selection,
        initialValues,
        open_form: state.sports.open_form
    }
}

export default connect(mapStateToProps, { open_close_modal, selected_game, open_close_form, update_lat_long })(reduxForm({
    form: 'post game form',
    validate
})(PostGameForm))

// export default reduxForm({
//     form: 'post game form',
//     validate: validation
// })(PostGameForm)


