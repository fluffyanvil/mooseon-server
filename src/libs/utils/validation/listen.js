const Joi = require('joi');

module.exports = {
    body: {
        user: Joi.string().min(3).max(30).required(),
        lng: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-85.05112878).max(85.05112878).required(),
        artist: Joi.string().required(),
        track:  Joi.string().required()
    }
  };

