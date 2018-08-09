const Joi = require('joi');

module.exports = {
    query: {
        lng: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-85.05112878).max(85.05112878).required(),
        radius: Joi.number().min(1).max(161).default(50),
        units: Joi.string().default('km'),
        count: Joi.number().min(0).max(1000).default(100)
    }
};