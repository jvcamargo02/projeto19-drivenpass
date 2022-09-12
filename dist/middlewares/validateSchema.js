"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => {
    return ((req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw { type: "unprocessable_entity", message: error };
        }
        next();
    });
};
exports.validateSchema = validateSchema;
