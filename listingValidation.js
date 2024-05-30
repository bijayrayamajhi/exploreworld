const Joi = require('joi');

const listingValidation = Joi.object({
    listing: Joi.object({

    title: Joi.string()
           .required(),
    description: Joi.string()
                .required(),

image: Joi.object({
         url: Joi.string().allow('', null).uri(),
        }).allow(null),
                    


price: Joi.number()
            .required()
            .min(0),

location: Joi.string()
            .required(),

country: Joi.string()
            .required(),

    }).required(),
    
    });


module.exports = listingValidation;