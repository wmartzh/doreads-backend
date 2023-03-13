import * as Joi from "joi";

export const RegisterBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.alternatives().try(
    Joi.string()
    .pattern(/^(\d{1,3})?-?(\d{1,5})?-?(\d{1,7})?-?(\d{1,6})?-?(\d{1})$/)
    .length(17), //ISBN-13
    Joi.string()
    .pattern(/^(\d{1,5})?-?(\d{1,7})?-?(\d{1,6})?-?(\d{1})$/)
    .length(13), //ISBN-10
  ).required(),
  category: Joi.string().required(),
  year: Joi.number().integer().min(0).max(2023).required(),
  picture: Joi.string(),
  editorial: Joi.string(),
  language: Joi.string().required(),
});

export const UpdateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  isbn: Joi.alternatives().try(
    Joi.string()
    .pattern(/^(\d{1,3})?-?(\d{1,5})?-?(\d{1,7})?-?(\d{1,6})?-?(\d{1})$/)
    .length(17), //ISBN-13
    Joi.string()
    .pattern(/^(\d{1,5})?-?(\d{1,7})?-?(\d{1,6})?-?(\d{1})$/)
    .length(13), //ISBN-10
  ),
  category: Joi.string(),
  year: Joi.number().integer().min(0).max(2023),
  picture: Joi.string(),
  editorial: Joi.string(),
  language: Joi.string(),
}).min(1);