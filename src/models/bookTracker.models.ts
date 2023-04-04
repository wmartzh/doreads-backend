import * as Joi from "joi";

export const ChangeBookStatusSchema = Joi.object({
  bookId: Joi.number().required(),
  status: Joi.string().valid("AVAILABLE", "LOANED", "UNAVAILABLE").insensitive().required(),
});