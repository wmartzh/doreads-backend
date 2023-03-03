import * as Joi from "joi";



export const RegisterStudentSchema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

export const ChangeStudentStatusSchema = Joi.object({
  studentId: Joi.number().required(),
  status: Joi.string().valid("ACTIVE", "BLOCKED", "INACTIVE").insensitive().required(),
});

export const UpdateStudentSchema = Joi.object({
  code: Joi.string(),
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  status: Joi.string().valid("ACTIVE", "BLOCKED", "INACTIVE"),
  phone: Joi.string(),
}).min(1);
