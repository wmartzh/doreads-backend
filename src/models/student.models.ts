import * as Joi from "joi";



export const RegisterStudentSchema = Joi.object({
  code: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().required(),
});
////permitir ordenar los resultados de estudiantes de la A-Z, codigo estudiante, id (id´s mas bajos mas antiguos) en orden ascendente y descendente.
export const ListStudentSchema = Joi.object({
  order: Joi.string().valid("asc", "desc").required().default("asc"),
  orderBy: Joi.string().valid("name", "code", "id").default("name"),

});

