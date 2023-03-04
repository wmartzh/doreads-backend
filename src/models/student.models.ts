import * as Joi from "joi";

export const RegisterStudentSchema = Joi.object({
  code: Joi.string().pattern(/^\d{4}-\d{4}$/).required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(/^\+\d{1,3}\s\d{3,14}$/).required(),
});

export const ChangeStudentStatusSchema = Joi.object({
  studentId: Joi.number().required(),
  status: Joi.string().valid("ACTIVE", "BLOCKED", "INACTIVE").insensitive().required(),
});

export const UpdateStudentSchema = Joi.object({
  code: Joi.string().pattern(/^\d{4}-\d{4}$/),
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  status: Joi.string().valid("ACTIVE", "BLOCKED", "INACTIVE"),
  phone: Joi.string().pattern(/^\+\d{1,3}\s\d{3,14}$/),
}).min(1);
