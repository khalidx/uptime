import uuid from 'uuid/v4'
import moment from 'moment'

export type Status = 'Operational' | 'Maintenance' | 'Down'

export interface Endpoint {
  id: string
  name: string
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
  feedback: Array<{
    submitted: string,
    content: string
  }>
  messages: Array<{
    id: string
    submitted: string
    content: string
    summary: string
    status: Status
    active: boolean
  }>
}

export interface Settings {
  title: string
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
        name: encodeURIComponent(sample.title.toLowerCase()),
        title: sample.title,
        location: `https://example.com/${encodeURIComponent(sample.title.toLowerCase())}`,
        status: sample.status,
        requests: [ 5, 4, 3, 2, 1 ].map(n => {
          return {
            start: moment().subtract(n, 'days').format('YYYY-MM-DD'),
            end: moment().subtract(n, 'days').add(2, 'seconds').format('YYYY-MM-DD'),
            latency: '2000',
            response: {
              type: 'error',
              message: '200 OK',
              raw: ''
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
  },
  saveEndpoints (endpoints: Array<Endpoint>): void {
    localStorage.setItem('endpoints', JSON.stringify(endpoints))
  },
  getSettings (): Settings {
    let settings = JSON.parse(localStorage.getItem('settings')) as Settings
    return settings ? settings : {
      title: 'API'
    }
  },
  saveSettings (settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings))
  },
  reset (): void {
    localStorage.removeItem('endpoints')
  }
}
