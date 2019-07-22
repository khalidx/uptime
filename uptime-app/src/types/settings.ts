import Joi from '@hapi/joi'

export default interface Settings {
  title: string
}

export const schema = Joi.object().keys({
  title: Joi.string().alphanum().min(3).max(30).required()
})
