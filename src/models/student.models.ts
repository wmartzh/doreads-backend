import * as Joi from "joi";

export const RegisterStudentSchema = Joi.object({
  code: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().required(),
});

export const ChangeStudentStatusSchema = Joi.object({
  studentId: Joi.number().required(),
  status: Joi.valid("ACTIVE", "BLOCKED", "INACTIVE").required(),
});