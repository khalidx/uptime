
import 'source-map-support/register'
import serverless from 'serverless-http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
import moment from 'moment-timezone'

import { servicesTable } from '../../uptime-core/src/constants'
import Settings, { settingsSchema } from '../../uptime-core/src/settings'
import Services, { serviceSchema } from '../../uptime-core/src/services'
import { list, create, read, update, del } from '../../uptime-core/src/rest'

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
