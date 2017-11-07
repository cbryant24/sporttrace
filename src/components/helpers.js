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