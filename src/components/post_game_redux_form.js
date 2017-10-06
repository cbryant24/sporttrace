import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Search_Bar from './map_searchbar';
import { connect } from 'react-redux';
import axios from 'axios';




const renderInput = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <input {...input} className="form-control" type={type}/>
            <div className="text-danger"> {touched && error} </div>
        </div>

    )
};

const renderCheckBox = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div style={{width: `50%`, display: `inline`}}>
            <label> {label}
            <input {...input} style={{width: `20%`}} className="form-control" type={type}/>
            </label>
            <div className="text-danger"> {touched && error} </div>
        </div>

    )
};


const renderSelect = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <select {...input} className="form-control" type={type}>
                <option></option>
                <option value="casual">Casual</option>
                <option value="competitive">Competitive</option>
            </select>
            <div className="text-danger"> {touched && error} </div>
        </div>
    )
};

const PostGameForm = props => {

    const handleFormVals = vals => {
        debugger
        console.log('form vals', vals)
        console.log(props)
        let complete_game = {
            game_time: vals.time,
            game_date: vals.date,
            game_description: vals.description,
            game_title: vals.title,
            game_vibe: vals.vibe,
            lat_lon: {
                lat: props.lat_lon_zip.lat,
                lon: props.lat_lon_zip.lat
            },
            zip: props.lat_lon_zip.zipcode,
            ball: vals.ball
        }
        axios.post('/php/data.php?action=insert', complete_game)
        this.history.push('/your_games')
    };

    const {handleSubmit, pristine, submitting, auth} = props;

    return (
        <form onSubmit={handleSubmit((vals)=> handleFormVals(vals))}>
            <div className="row">
            <div className="col-sm-6 col-12">
            <Field name="title" component={renderInput} label="Title"  className="game_title_input" type="text" placeholder="Your Title"/>
            <Field name="time" component={renderInput} label="Time" type="time"   className="game_time_input" placeholder="Game Time"/>
            <Field name="date" component={renderInput} label="Date" type="date" className="game_time_input" placeholder="Game Time"/>
            </div>
            <div className="col-sm-6 col-12">
            <Field name="vibe" component={renderSelect} label="Vibe" type="select" className="game_vibe_input form-control" />
            <Field name="ball" component={renderCheckBox} label="Ball" type="checkbox" className="game_vibe_input" />
            <Search_Bar/>
            <Field name='description' component={renderInput} label="Description" type="text-area" className="game_description_input" placeholder="Your Description"/>
            </div>
            </div>
            <button style={{marginTop: `10px`}} type="submit" disabled={pristine || submitting } className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</button>
        </form>
    )
};

const validation = vals => {
    const errors = {};

    if (!vals.title) {
        errors.title = 'Enter a Game Title'
    }
    if (!vals.time) {
        errors.time = 'Enter a Game Time'
    }
    if (!vals.date) {
        errors.date = 'Enter a Game Date'
    }
    if (!vals.vibe) {
        errors.vibe = 'Select the pace of the game'
    }
    return errors;
};



function mapStateToProps(state) {
    return {
        lat_lon_zip: state.sports.lat_lon_zip
    }
}

export default connect(mapStateToProps, null)(reduxForm({
    form: 'post game form',
})(PostGameForm))

// export default reduxForm({
//     form: 'post game form',
//     validate: validation
// })(PostGameForm)


