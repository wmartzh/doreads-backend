import * as Joi from "joi";

export const AddBookSchema = Joi.array().items(
  Joi.object({
    code: Joi.string().pattern(/^[A-Z]{3}-\d{4}-\d{4}$/).required(),
    bookId: Joi.number().required(),
  })
);

export const ChangeBookStatusSchema = Joi.object({
  bookId: Joi.number().required(),
  status: Joi.string().valid("AVAILABLE", "LOANED", "UNAVAILABLE").insensitive().required(),
});

export const UpdateBookSchema = Joi.object({
  code: Joi.string().pattern(/^[A-Z]{3}-\d{4}-\d{4}$/),
  status: Joi.string().valid("AVAILABLE", "LOANED", "UNAVAILABLE"),
}).min(1);