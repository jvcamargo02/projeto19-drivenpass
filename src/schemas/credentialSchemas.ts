import Joi from "joi";

export const credentialSchema = Joi.object({
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
})