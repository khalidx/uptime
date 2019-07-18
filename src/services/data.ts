import uuid from 'uuid/v4'
import moment from 'moment'

export type Status = 'Operational' | 'Maintenance' | 'Down'

export interface Endpoint {
  id: string
  title: string
  location: string
  status: Status
  requests: Array<{
    start: string
    end: string
    latency: string
    response: {
      type: 'success' | 'error'
      message: string
      raw: string
    }
  }>
  checks: Array<{
    cron: string
    lastCheck: string
    nextCheck: string
  }>
}

export interface Message {
  id: string
  content: string
  status: Status
}

export default {
  getEndpoints (): Array<Endpoint> {
    let endpoints = JSON.parse(localStorage.getItem('endpoints') || '[]') as Array<Endpoint>
    let samples: Array<{ title: string, status: Status }> = [
      { title: 'Backend', status: 'Operational' },
      { title: 'Frontend', status: 'Operational' },
      { title: 'API', status: 'Maintenance' },
      { title: 'Payments', status: 'Operational' },        
      { title: 'Helpdesk', status: 'Down' }
    ]
    return (endpoints.length > 0) ? endpoints : samples.map(sample => {
      return {
        id: uuid(),
        title: sample.title,
        location: 'https://example.com/backend',
        status: sample.status,
        requests: [
          {
            start: moment().subtract(1, 'days').toString(),
            end: moment().subtract(1, 'days').toString(),
            latency: '2000',
            response: {
              type: 'success',
              message: '200 OK',
              raw: ''
            }
          }
        ],
        checks: [
          {
            cron: '@hourly',
            lastCheck: moment().subtract(1, 'days').toString(),
            nextCheck: moment().toString()
          }
        ]
      }
    })
  },
  saveEndpoints (endpoints: Array<Endpoint>): void {
    localStorage.setItem('endpoints', JSON.stringify(endpoints))
  },
  getMessages (): Array<Message> {
    let messages = JSON.parse(localStorage.getItem('messages') || '[]')
    return (messages.length > 0) ? messages : [
      { id: 1, text: 'API is currently under maintenance.', status: 'Maintenance' },
      { id: 2, text: 'Helpdesk is experiencing issues.', status: 'Down' }
    ]
  },
  saveMessages (messages: Array<Message>): void {
    return JSON.parse(localStorage.getItem('messages'))
  }
}
