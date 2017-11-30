import React from 'react';


/**
 * @function renderInput
 * @param {obj} param0 redux form object values and methods
 * @return input field for redux form for game creation and editing
 */
export const renderInput = ({input, label, type, placeholder, meta: {touched, error}}) => {
    debugger
    return (
        <div className="form-group">
            <label> {label} </label>
            <input placeholder={placeholder} {...input} className="form-control" type={type}/>
            <div className="form-error text-center"> {touched && error} </div>
        </div>

    )
};

/**
 * @function renderCheckBox
 * @param {obj} param0 redux form object values and methods
 * @return checkbox field for redux form for game creation and editing
 */

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

/**
 * @function renderSelect
 * @param {obj} param0 redux form object values and methods
 * @return select field for redux form for game creation and editing
 */

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


export const renderAmPm = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <select {...input} className="form-control" id='ampm' type={type}>
                <option></option>
                <option value="am">AM</option>
                <option value="pm">PM</option>
            </select>
            <div className="form-error text-center"> {touched && error} </div>
        </div>
    )
};


/**
 * @function format_time
 * @param {object} vals 
 * @return properly formatted time string, format determined by function parameters
 */

export const format_time = vals => {
    debugger
    const date = new Date();
    if(vals.data_type === 'hh:mm' && vals.type === 'set') {
        let hours = new Date(vals.game_milliseconds).getHours() > 12 ? new Date(vals.game_milliseconds).getHours() - 12 : new Date(vals.game_milliseconds).getHours()
        let min = new Date(vals.game_milliseconds).getMinutes()
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }

    if(vals.data_type === 'hh:mm' && vals.type === 'set mili') {
        let hours = new Date(vals.game_milliseconds).getHours()
        let min = new Date(vals.game_milliseconds).getMinutes()
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }

    if(vals.data_type === 'hh:mm' && vals.type === 'current') {
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        hours = hours == '0' || hours == '00'? '12' : hours
        let min = date.getMinutes()
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }

    if(vals.data_type === 'hh:mm' && vals.type === 'current mili') {
        let hours = date.getHours()
        let min = date.getMinutes()
        return `${add_remove_chars({type: 'leading_zero', char: hours})}:${add_remove_chars({type: 'leading_zero', char: min})}`
    }
}

/**
 * @function format_date
 * @param {object} vals 
 * @return properly formatted date string, format determined by function obj parameter
 */

export const format_date = vals => {
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
        var date = new Date().toLocaleDateString();
        date = date.replace(/(\d+)\D(\d+)\D(\d+)/g, (str, month, day, year) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${year}-${month}-${day}`
        })
        return date
    }
    if(vals.data_type === 'mm/dd/yyyy' && vals.type === 'format') {
        let formatted_date = vals.date.replace(/(\d+)-(\d+)-(\d+)/, (str, year, month, day) => {
            month = add_remove_chars({type: 'leading_zero', char: month})
            day = add_remove_chars({type: 'leading_zero', char: day})
            return `${month}/${day}/${year}`
        })
        return formatted_date
    }
}

export const check_date = date => {

}

/**
 * @function get_address
 * @param {string} address 
 * @return array of address elements from google maps search results formatted for html display
 */

export const get_address = address => {
    const address_elements = {}
    if(!address) return 
    address.split('</span>').filter( item => item.length > 0).map( item => {
        address_elements[item.match(/class="(.*)(?=">)/)[1]] = item.match(/>([\w\d-_ ]+)/)[1]
    })
    return address_elements
}

function add_remove_chars(val) {
    if(val.type === 'leading_zero') 
        if(val.char.toString().length < 2) 
            val.char = `0${val.char.toString()}`
        return val.char

}

/**
 * @function validate
 * @param {object} vals
 * @returns param object with any errors matched against specified statements
 */

export const validate = vals => {
    const errors = {};
    const current_date = new Date().getTime();
    const user_date = new Date(vals.date).getTime();

    const slash_date_check = new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[1]|3[0])\/(20|19)\d{2}$/);
    const hyphen_date_check = new RegExp(/^(20|19)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])/);
    const time_check = new RegExp(/\b((1[0-2]|0?[1-9]):([0-5][0-9])$)/);
    // const mil_time_check = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    const alpha_numeric = new RegExp(/^[0-9a-zA-Z!#@' ]+$/);

    if (!vals.title) 
        errors.title = 'Enter a Game Title'
    
    if(!alpha_numeric.test(vals.title))
        errors.title = 'Enter a Valid Game Title'

    if(!time_check.test(vals.time))
        errors.time = 'Enter a valid time HH:MM'
    
    if(!vals.time) 
        errors.time = 'Enter a Game Time'

    if (!vals.date) 
        errors.date = 'Enter a Game Date'
    
    if (!vals.vibe) 
        errors.vibe = 'Select the style of game'
    
    if(user_date < current_date)
        errors.date = 'Enter a Future Game Date' 

    if(!slash_date_check.test(vals.date) && !hyphen_date_check.test(vals.date))
        errors.date = 'Enter a valid date MM/DD/YYYY'
    
    if(vals.title && vals.title.length > 35) 
        errors.title = 'Enter a shorter title'

    if(!vals.ampm)
        errors.ampm = ' Select AM or PM '

    if(vals.description && vals.description.length > 50)
        errors.description = 'Enter a shorter description'

    if(vals.description && !alpha_numeric.test(vals.description))
        errors.description = 'Enter a Valid Description'

    return errors;
};