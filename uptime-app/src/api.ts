
import 'source-map-support/register'
import serverless from 'serverless-http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
import moment from 'moment-timezone'

import { servicesTable, metricsTable } from './core/constants'
import Settings, { settingsSchema } from './core/settings'
import Services, { serviceSchema } from './core/services'
import { list, create, read, update, del } from './core/rest'

const settings = new Settings(servicesTable)
const services = new Services(servicesTable)

const router = new KoaRouter()

router
  // root
  .get('/', async (ctx, next) => {
    ctx.body = { message: 'Welcome to uptime!' }
    await next()
  })
  // settings
  .get('/settings', read(settings))
  .put('/settings', update(settings, settingsSchema))
  .del('/settings', del(settings))
  // services
  .get('/services', list(services))
  .post('/services', create(services, serviceSchema))
  .get('/services/:id', read(services))
  .put('/services/:id', update(services, serviceSchema))
  .del('/services/:id', del(services))
  // metrics
  .get('/services/:id/metrics', async (ctx, next) => {
    // todo: check service exists before query?
    // todo: support complex crud
    // todo: support nested paths
    let response = await metricsTable.client.query({
      TableName: metricsTable.name,
      KeyConditionExpression: '#id = :id AND #time BETWEEN :fromDateTime AND :toDateTime',
      ScanIndexForward: false, // read in descending order (most recent first)
      Limit: 120, // max 120 records
      ExpressionAttributeNames: {
        '#id': 'id',
        '#time': 'time',
        '#start': 'start',
        '#end': 'end',
        '#type': 'type',
        '#code': 'code',
        '#message': 'message',
        '#latency': 'latency'
      },
      ExpressionAttributeValues: {
        ':id': ctx.params.id,
        ':fromDateTime': moment().subtract(1, 'day').toISOString(),
        ':toDateTime': moment().toISOString()
      },
      ProjectionExpression: '#time, #start, #end, #type, #code, #message, #latency'
    }).promise()
    ctx.body = response.Items
    ctx.status = 200
    await next()
  })

const app = new Koa()

app
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.error(error)
      ctx.type = 'application/json'
      ctx.status = error['x-status'] || 500
      ctx.body = { message: error['x-message'] || 'Internal server error' }
      // ctx.app.emit('error', error, ctx)
    }
  })
  .use(async (ctx, next) => {
    const start = moment()
    console.log(start.tz('America/New_York').format('[Invoked on] dddd, MMMM Do YYYY, [at] h:mm:ss SSS a z'))
    console.log(`The current route is ${ctx.path}`)
    await next()
    const end = moment()
    console.log(end.tz('America/New_York').format('[Responding on] dddd, MMMM Do YYYY, [at] h:mm:ss SSS a z'))
    console.log(`Execution took ${end.diff(start, 'milliseconds')} milliseconds`)
  })
  .use(koaBodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

export const handler = serverless(app)
