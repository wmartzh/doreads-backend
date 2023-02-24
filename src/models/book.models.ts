import * as Joi from "joi";

export const RegisterBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  year: Joi.number().required(),
  picture: Joi.string(),
  editorial: Joi.string(),
  language: Joi.string().required(),
});