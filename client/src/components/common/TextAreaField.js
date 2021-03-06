import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaFieldGroup=({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
})=>{
    return(
        <div className="form-group">
            <textarea className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
                placeholder={placeholder} name={name} value={value} onChange={onChange} />


            {info && (<div className="form-text text-muted"> {info} </div>)}
            {error && (<div className="invalid-feedback"> {error} </div>)}

        </div>
    )
}

TextAreaFieldGroup.prototype = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.string.isRequired

}


export default TextAreaFieldGroup;