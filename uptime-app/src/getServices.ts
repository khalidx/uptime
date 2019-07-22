import 'source-map-support/register'
import { APIGatewayProxyHandler } from 'aws-lambda'

import uuid from 'uuid/v4'
import moment from 'moment'

import Service, { Status } from './types/service'
import DynamoDb from './utilities/dynamoDb'
import Response from './utilities/response'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('Reading from the database ...')
    let settings = await getServices()
    console.log('Responding with status:success ...')
    return Response(200, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error(error.message)
    console.log('Responding with status:error ...')
    return Response(500, JSON.stringify({ message: 'Internal server error.' }))
  }
}

export async function getServices (): Promise<Array<Service>> {
  let table = process.env.DYNAMODB_TABLE
  if (!table) throw new Error('Missing DynamoDb table name.')
  let response = await DynamoDb.get({
    TableName: table,
    Key: {
      id: 'services'
    }
  }).promise()
  if (response.Item) return JSON.parse(response.Item.json) as Array<Service>
  let samples: Array<{ title: string, status: Status }> = [
    { title: 'Backend', status: 'Operational' },
    { title: 'Frontend', status: 'Operational' },
    { title: 'API', status: 'Maintenance' },
    { title: 'Payments', status: 'Operational' },        
    { title: 'Helpdesk', status: 'Down' }
  ]
  return samples.map(sample => {
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
}
