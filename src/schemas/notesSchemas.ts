import Joi from "joi"

export const notesSchema = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required()
})