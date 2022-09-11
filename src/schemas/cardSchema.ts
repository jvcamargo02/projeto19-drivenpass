import Joi, { boolean, number, string } from "joi"

export const cardSchema = Joi.object({
    number: Joi.number().required(),
    holderName: Joi.string().required(),
    securityCode: Joi.string().required(),
    expirationDate: Joi.string().required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid("credit", "debit", "both"),
    title: Joi.string().required()
})

/* 
    number: number,
    holderName: string,
    securityCode: string,
    expirationDate: number,
    password: string,
    isVirtual: boolean,
    type: string
    title: string
*/