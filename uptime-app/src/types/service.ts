import Joi from '@hapi/joi'

export type Status = 'Operational' | 'Maintenance' | 'Down'

export default interface Service {
  id: string
  name: string
  location: string
  status: Status
}

export const schema = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(30).required(),
  title: Joi.string().min(1).max(30).required(),
  location: Joi.string().uri().required(),
  status: Joi.allow('Operational', 'Maintenance', 'Down').required(),
  requests: Joi.array().required().items(Joi.object().keys({
    start: Joi.string().isoDate().required(),
    end: Joi.string().isoDate().required(),
    latency: Joi.number().integer().unit('milliseconds').required(),
    response: Joi.object().required().keys({
      type: Joi.allow('success', 'error').required(),
      message: Joi.string().min(1).max(30).required(),
      raw: Joi.string().min(1).max(500).required()
    })
  })),
  checks: Joi.array().required().items(Joi.object().keys({
    cron: Joi.string().min(1).max(30).required(),
    lastCheck: Joi.string().isoDate().required(),
    nextCheck: Joi.string().isoDate().required()
  })),
  feedback: Joi.array().required().items(Joi.object().keys({
    submitted: Joi.string().isoDate().required(),
    content: Joi.string().min(1).max(280).required()
  })),
  messages: Joi.array().required().items(Joi.object().keys({
    id: Joi.string().uuid().required(),
    submitted: Joi.string().isoDate().required(),
    summary: Joi.string().min(1).max(280).required(),
    content: Joi.string().max(3000).optional(),
    status: Joi.allow('Operational', 'Maintenance', 'Down').required(),
    active: Joi.bool().required()
  }))
})
