import Joi from '@hapi/joi'

export class HttpCompatibleError extends Error {
  'x-status': number
  'x-message': string
  constructor(status: number, message: string) {
    super(message)
    this['x-status'] = status
    this['x-message'] = message
  }
}

export interface Settings {
  title: string
}

export const updateSettingsSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required()
})

export interface Log {
  timestamp: number
  message: string
}

export type Status = 'Operational' | 'Maintenance' | 'Down'

export type Rate = '1 minute' | '5 minutes' | '15 minutes' | '30 minutes' | '1 hour'

export interface CreateService {
  title: string
  location: string
  status: Status
  checks: Array<{
    rate: Rate
  }>
}

export const createServiceSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().min(1).max(30).required(),
  location: Joi.string().uri().required(),
  status: Joi.string().valid('Operational', 'Maintenance', 'Down').required(),
  checks: Joi.array().required().items(Joi.object().keys({
    rate: Joi.valid('1 minute', '5 minutes', '15 minutes', '30 minutes', '1 hour').required(),
  })).min(1)
})

export interface UpdateService {
  title?: string
  location?: string
  status?: Status
  checks?: Array<{
    rate: Rate
  }>
}

export const updateServiceSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().min(1).max(30).optional(),
  location: Joi.string().uri().optional(),
  status: Joi.string().valid('Operational', 'Maintenance', 'Down').optional(),
  checks: Joi.array().optional().items(Joi.object().keys({
    rate: Joi.valid('1 minute', '5 minutes', '15 minutes', '30 minutes', '1 hour').required(),
  })).min(1)
})

export interface Service extends CreateService {
  id: string
  name: string
  title: string
  location: string
  status: Status
  checks: Array<{
    rate: Rate
    nextCheck: string
  }>
  metrics: Array<Metric>
  messages: Array<Message>
  feedback: Array<{
    submitted: string
    content: string
  }>
}

export interface CreateMessage {
  summary: string
  content?: string
  status: Status
  signature: string
}

export const createMessageSchema: Joi.ObjectSchema = Joi.object().keys({
  summary: Joi.string().min(1).max(280).required(),
  content: Joi.string().max(3000).optional(),
  status: Joi.string().valid('Operational', 'Maintenance', 'Down').required(),
  signature: Joi.string().min(1).max(50).required()
})

export interface Message extends CreateMessage {
  id: string
  submitted: string
  active: boolean
  summary: string
  content?: string
  status: Status
  signature: string
}

export type Metric = {
  id: string // service id (hash key)
  time: string // ISO timestamp (range key)
  start: string
  end: string
  type: 'success' | 'error'
  code: number
  message: string
  raw?: string
  latency: number
}
