import * as Joi from "joi";

export const AddBookSchema = Joi.object({
  code: Joi.string().required(),
  bookId: Joi.number().required(),
});

export const ChangeBookStatusSchema = Joi.object({
  bookId: Joi.number().required(),
  status: Joi.string().valid("AVAILABLE", "LOANED", "UNAVAILABLE").insensitive().required(),
});

export const UpdateBookSchema = Joi.object({
  code: Joi.string(),
  status: Joi.string().valid("AVAILABLE", "LOANED", "UNAVAILABLE"),
}).min(1);