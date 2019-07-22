import Joi from '@hapi/joi'

let options: Joi.ValidationOptions = {
  abortEarly: false,
  stripUnknown: {
    arrays: true,
    objects: true
  }
}

// TODO need a better validator to handle unclean input
export default function validate<Type> (schema: Joi.ObjectSchema, json: string | undefined | null): Joi.ValidationResult<Type> {
  try {
    let object = JSON.parse(json || '')
    return schema.validate<Type>(object, options)
  } catch (error) {
    return schema.validate<Type>({} as Type, options)
  }
}
