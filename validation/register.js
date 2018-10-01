const Validator = require("validator");
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){

    console.log("register validation data :: ", data);
    let errors  = {};

    data.name = !isEmpty(data.name) ? data.name : ''; //If dataName is empty ite won't be string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min:2, max: 30})){
        errors.name = "Name must be between 2 and 30 characters";
    }

    if(Validator.isEmpty(data.name)){
            errors.name = "Name field is required...";
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid...";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is invalid...";
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters...";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Conform password is invalid...";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}