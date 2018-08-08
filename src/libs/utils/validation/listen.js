const Joi = require('joi');

module.exports = {
    body: {
        user: Joi.string().alphanum().min(3).max(30).required(),
        lng: Joi.number().required(),
        lat: Joi.number().required(),
        artist: Joi.string().alphanum().required(),
        track:  Joi.string().alphanum().required()
    }
  };

