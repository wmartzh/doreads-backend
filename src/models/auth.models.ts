import * as Joi from "joi";

export const RegisterUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  name: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const RefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const ProfileSchema = Joi.object({
  Token: Joi.string().required(),
});
