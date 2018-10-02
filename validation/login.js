const Validator = require("validator");
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){

    let errors  = {};

    console.log("server -- login -- data :: ", data);

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    console.log("Type of --- data.email ::  ", typeof(data.email) );
    console.log("Type of --- data.password ::  ", typeof(data.password) );
    console.log("data.email ::  ",data.email );
    console.log("data.password ::  ",data.password );

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid...";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required..";
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters...";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required...";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}