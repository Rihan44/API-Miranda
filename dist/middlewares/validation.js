"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const authValidation = (schema) => {
    const validation = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.error('Validation error: ', error);
            return res.status(400).json({ error: true, message: error.message });
        }
        next();
    };
    return validation;
};
exports.authValidation = authValidation;
