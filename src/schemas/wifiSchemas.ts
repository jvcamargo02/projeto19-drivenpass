import Joi from "joi"

export const wifiSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
})