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
  location: Joi.allow(Joi.string().uri(), Joi.string().uri()).required(),
  status: Joi.allow('Operational', 'Maintenance', 'Down')
// requests: Array<{
//   start: string
//   end: string
//   latency: string
//   response: {
//     type: 'success' | 'error'
//     message: string
//     raw: string
//   }
// }>
// checks: Array<{
//   cron: string
//   lastCheck: string
//   nextCheck: string
// }>
// feedback: Array<{
//   submitted: string,
//   content: string
// }>
// messages: Array<{
//   id: string
//   submitted: string
//   content: string
//   summary: string
//   status: Status
//   active: boolean
// }>
})
