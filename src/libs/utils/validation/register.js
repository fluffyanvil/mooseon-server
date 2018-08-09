const Joi = require('joi');

module.exports = {
    body: {
        user: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
        installation: Joi.string().min(3).max(30).required()
    }
};