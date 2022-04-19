import Joi from 'joi';

export const fieldsValidations = {
  name: Joi.string().required().messages({
    'string.base': '`name` deve ser do tipo `string`',
    'string.empty': 'O nome não pode ser vazio',
    'any.required': '`name` deve ser enviado',
  }),
  birth_date: Joi.date().iso().less('now').required().messages({
    'date.base': '`birth_date` deve ser do tipo `date`',
    'date.format': 'A data deve seguir padrão ISO',
    'date.less': 'A data de nascimento deve ser menor do que o dia atual',
    'any.required': '`birth_date` deve ser enviado',
  }),
  appointment_date: Joi.date().iso().min('now').required().messages({
    'date.base': '`appointment_date` deve ser do tipo `date`',
    'date.format': 'A data deve seguir padrão ISO',
    'date.min': 'A data do agendamento deve maior do que o dia atual',
    'any.required': '`appointment_date` deve ser enviado',
  }),
};
