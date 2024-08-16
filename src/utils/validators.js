const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateUser = (userData) => {
    return userSchema.validate(userData);
};

const validateLogin = (loginData) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return loginSchema.validate(loginData);
};


const validator = {
    validateUser,
    validateLogin,
};

module.exports = validator;
