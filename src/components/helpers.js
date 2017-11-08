import React from 'react';

export const renderInput = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <input {...input} className="form-control" type={type}/>
            <div className="form-error text-center"> {touched && error} </div>
        </div>

    )
};

export const renderCheckBox = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div style={{width: `50%`, display: `inline`}}>
            <label> {label}
            <input {...input} style={{width: `20%`}} className="form-control" type={type}/>
            </label>
            <div className="form-error"> {touched && error} </div>
        </div>

    )
};

export const renderSelect = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <select {...input} className="form-control" type={type}>
                <option></option>
                <option value="casual">Casual</option>
                <option value="competitive">Competitive</option>
            </select>
            <div className="form-error text-center"> {touched && error} </div>
        </div>
    )
};

export const format_time = vals => {
    debugger
    const date = new Date();
    if(vals.data_type === 'hh:mm' && vals.type === 'set') {
        let hours = new Date(vals.game_milliseconds).getHours() > 12 ? new Date(vals.game_milliseconds).getHours() - 12 : new Date(vals.game_milliseconds).getHours()
        let min = new Date(vals.game_milliseconds).getMinutes()
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }

    if(vals.data_type === 'hh:mm' && vals.type === 'current') {
        let hours = date.getHours().toString().match(/^\d+(?=:)/).join('') > 12 ? vals.time.match(/^\d+(?=:)/).join('') - 12 : vals.time.match(/^\d+(?=:)/).join('')
        let min = date.getHours().toString().match(/\d+$/).join('')
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }
    
}

export const format_date = vals => {
    debugger
    if(vals.data_type === 'mm-dd-yyyy' && vals.type === 'set') {
        let set_date = new Date(vals.game_milliseconds).toLocaleDateString()
        let formatted_date = set_date.replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${month}-${day}-${year}`
        })
        return formatted_date
    }

    if(vals.data_type === 'mm-dd-yyyy' && vals.type === 'current') {
        var date = new Date().toLocaleDateString;
        date = date.replace(/(\d+)\/|-(\d+)\/|-(\d+)/, (str, month, day, year) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${month}-${day}-${year}`
        })
        return date
    }
    
    if(vals.data_type === 'yyyy-mm-dd' && vals.type === 'set') {
        let set_date = new Date(vals.game_milliseconds).toLocaleDateString()
        let formatted_date = set_date.replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${year}-${month}-${day}`
        })
        return formatted_date
    }

    if(vals.data_type === 'yyyy-mm-dd' && vals.type === 'current') {
        var date = new Date().toLocaleDateString;
        date = date.replace(/(\d+)\/|-(\d+)\/|-(\d+)/, (str, month, day, year) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${year}-${month}-${day}`
        })
        return date
    }
}



function add_remove_chars(val) {
    debugger
    if(val.type === 'leading_zero') 
        if(val.char.toString().length < 1) 
            val.char = `0${val.char}`
        return val.char

}

export const validate = vals => {
    const errors = {};
    const current_date = new Date().toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
        day = day < 10 ? `0${day}`:day
        return `${year}-${month}-${day}`
    })    
    const alpha_numeric = new RegExp(/^[0-9a-zA-Z!#@' ]+$/)

    if (!vals.title) 
        errors.title = 'Enter a Game Title'
    
    if(!alpha_numeric.test(vals.title))
        errors.title = 'Enter a Valid Game Title'

    if (!vals.time) 
        errors.time = 'Enter a Game Time'

    if (!vals.date) 
        errors.date = 'Enter a Game Date'
    
    if (!vals.vibe) 
        errors.vibe = 'Select the style of game'
    
    if(vals.date < current_date )
        errors.date = 'Enter a Future Game Date' 
    

    if(vals.description && !alpha_numeric.test(vals.description))
        errors.description = 'Enter a Valid Description'

    return errors;
};