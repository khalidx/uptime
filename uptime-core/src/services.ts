import uuid from 'uuid/v4'
import moment from 'moment-timezone'
import Joi from '@hapi/joi'

import CRUD, { Table, Identifiable } from './crud'

export type Status = 'Operational' | 'Maintenance' | 'Down'

export type Service = {
  name: string
  title: string
  location: string
  status: Status
  requests: Array<{
    start: string
    end: string
    latency: number
    response: {
      type: 'success' | 'error',
      message: string
      raw: string
    }
  }>
}

export const serviceSchema: Joi.ObjectSchema = Joi.object().keys({
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

export default class extends CRUD<Service> {
  constructor (table: Table) {
    super(table, 'service')
  }
  public async list () {
    let services = await super.list()
    let samples: Array<{ title: string, status: Status }> = [
      { title: 'Backend', status: 'Operational' },
      { title: 'Frontend', status: 'Operational' },
      { title: 'API', status: 'Maintenance' },
      { title: 'Payments', status: 'Operational' },        
      { title: 'Helpdesk', status: 'Down' }
    ]
    return (services.length > 0) ? services : samples.map<Identifiable & Service>(sample => {
      return {
        id: uuid(),
        name: encodeURIComponent(sample.title.toLowerCase()),
        title: sample.title,
        location: `https://example.com/${encodeURIComponent(sample.title.toLowerCase())}`,
        status: sample.status,
        requests: [ 5, 4, 3, 2, 1 ].map(n => {
          return {
            start: moment().subtract(n, 'days').format('YYYY-MM-DD'),
            end: moment().subtract(n, 'days').add(2, 'seconds').format('YYYY-MM-DD'),
            latency: 2000,
            response: {
              type: 'error',
              message: '200 OK',
              raw: 'Nothing'
            }
          }
        }),
        checks: [
          {
            cron: '@hourly',
            lastCheck: moment().calendar(),
            nextCheck: moment().add(1, 'hours').calendar()
          }
        ],
        feedback: [
          {
            submitted: moment().subtract(3, 'months').subtract(4, 'hours').subtract(23, 'minutes').calendar(),
            content: 'You guys are awesome! The service is so fast. Keep the good work going!'
          },
          {
            submitted: moment().subtract(1, 'days').subtract(14, 'seconds').calendar(),
            content: 'That has to be a fake review down there. This has been down for hours and no-one is on-call!'
          }
        ],
        messages: (sample.title === 'API') ? [
          {
            id: uuid(),
            submitted: moment().subtract(3, 'hours').toISOString(),
            content: '',
            summary: 'API is currently under maintenance.',
            status: 'Maintenance',
            active: true
          }
        ] : (sample.title === 'Helpdesk' ) ? [
          {
            id: uuid(),
            submitted: moment().subtract(5, 'minutes').toISOString(),
            content: '',
            summary: 'Helpdesk is experiencing issues.',
            status: 'Down',
            active: true
          }
        ] : (sample.title === 'Backend' ) ? [
          {
            id: uuid(),
            submitted: moment().subtract(1, 'days').toISOString(),
            content: 'Thank you for your patience during issue resolution.',
            summary: 'Backend is operational after being down for 2 hours.',
            status: 'Operational',
            active: false
          },
          {
            id: uuid(),
            submitted: moment().subtract(1, 'days').subtract(2, 'hours').toISOString(),
            content: 'Services are experiencing request latencies of more than 7 seconds on average.',
            summary: 'Backend is down.',
            status: 'Down',
            active: false
          },
          {
            id: uuid(),
            submitted: moment().subtract(1, 'year').subtract(3, 'months').toISOString(),
            content: 'Restarting production servers 1, 2, and 3.',
            summary: 'Scheduled backend server restarts.',
            status: 'Maintenance',
            active: false
          }
        ] :[]
      }
    })
  }

}
