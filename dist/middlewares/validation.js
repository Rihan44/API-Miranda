"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidation = void 0;
const generateValidation = (schema) => {
    const validation = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.error('Validation error: ', error);
            return res.status(400).json({});
        }
        next();
    };
    return validation;
};
exports.generateValidation = generateValidation;
