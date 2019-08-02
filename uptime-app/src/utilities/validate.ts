import Joi from '@hapi/joi'

let options: Joi.ValidationOptions = {
  abortEarly: false,
  allowUnknown: false
}

export default function validate<Type> (schema: Joi.ObjectSchema, object: any): Joi.ValidationResult<Type> {
  return schema.validate<Type>(object, options)
}
