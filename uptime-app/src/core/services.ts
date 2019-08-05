import uuid from 'uuid/v4'
import moment from 'moment-timezone'
import Joi from '@hapi/joi'

import CRUD, { Table, Identifiable } from './crud'
import { Metric } from '../pinger'

export type Status = 'Operational' | 'Maintenance' | 'Down'

export type Rate = '1 minute' | '5 minutes' | '15 minutes' | '30 minutes' | '1 hour'
export const rates: Array<Rate> = [ '1 minute', '5 minutes', '15 minutes', '30 minutes', '1 hour' ]

export type Service = {
  name: string
  title: string
  location: string
  status: Status
  metrics: Array<Metric>
  checks: Array<{
    rate: Rate
    lastCheck: string,
    nextCheck: string
  }>
  feedback: Array<{
    submitted: string
    content: string
  }>
  messages: Array<{
    id: string
    submitted: string
    summary: string
    content?: string
    status: Status
    active: boolean
  }>
}

export const serviceSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().min(1).max(30).required(),
  title: Joi.string().min(1).max(30).required(),
  location: Joi.string().uri().required(),
  status: Joi.allow('Operational', 'Maintenance', 'Down').required(),
  // Don't allow metrics to be provided when creating a service
  // metrics: Joi.array().required().items(Joi.object().keys({
  //   start: Joi.string().isoDate().required(),
  //   end: Joi.string().isoDate().required(),
  //   latency: Joi.number().integer().unit('milliseconds').required(),
  //   response: Joi.object().required().keys({
  //     type: Joi.allow('success', 'error').required(),
  //     message: Joi.string().min(1).max(30).required(),
  //     raw: Joi.string().min(1).max(500).required()
  //   })
  // })),
  checks: Joi.array().required().items(Joi.object().keys({
    rate: Joi.string().min(1).max(30).required(),
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
    let samples: Array<{ id: string, title: string, status: Status }> = [
      { id: 'service-7a5cbe70-48c8-4789-b76a-a7b925d17ac4', title: 'Backend', status: 'Operational' },
      { id: 'service-a16e70ab-80b1-4ad1-bbc7-73e753bbd1c4', title: 'Frontend', status: 'Operational' },
      { id: 'service-d9749a56-2827-4598-94f4-90c7f91f98ea', title: 'API', status: 'Maintenance' },
      { id: 'service-6530adaa-0279-45f3-883e-7ecd4829bbf5', title: 'Payments', status: 'Operational' },        
      { id: 'service-3d302923-8369-486f-8789-49a252fbd046', title: 'Helpdesk', status: 'Down' }
    ]
    return (services.length > 0) ? services : samples.map<Identifiable & Service>(sample => {
      return {
        id: sample.id,
        name: encodeURIComponent(sample.title.toLowerCase()),
        title: sample.title,
        location: `https://example.com/${encodeURIComponent(sample.title.toLowerCase())}`,
        status: sample.status,
        metrics: [...Array(15).keys()].map(n => {
          return {
            id: sample.id,
            time: moment().subtract(n, 'days').toISOString(),
            start: moment().subtract(n, 'days').toISOString(),
            end: moment().subtract(n, 'days').add(2, 'seconds').toISOString(),
            type: (n != 7 && n != 8 && n != 14) ? 'success' : 'error',
            code: (n != 7 && n != 8 && n != 14) ? 200 : 500,
            message: (n != 7 && n != 8 && n != 14) ? '200 OK': '500 Internal server error',
            latency: Math.floor(Math.random() * (4000 - 10)) + 10
          }
        }),
        checks: [
          {
            rate: '5 minutes',
            lastCheck: moment().calendar(),
            nextCheck: moment().add(5, 'minutes').calendar()
          },
          {
            rate: '1 hour',
            lastCheck: moment().calendar(),
            nextCheck: moment().add(1, 'hour').calendar()
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
