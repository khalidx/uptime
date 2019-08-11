import 'source-map-support/register'
import serverless from 'serverless-http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
import moment from 'moment-timezone'

import { router as settings } from './core/settings'
import { router as services } from './core/services'
import { router as logs } from './core/logs'

const router = new KoaRouter()

router
  .get('/', async (ctx, next) => {
    ctx.body = { message: 'Welcome to uptime!' }
    await next()
  })
  .use(settings.routes(), settings.allowedMethods())
  .use(services.routes(), services.allowedMethods())
  .use(logs.routes(), logs.allowedMethods())

const app = new Koa()

app
  .use(async (ctx, next) => {
    try {
      ctx.response.set({
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': 'true' // Required for cookies, authorization headers with HTTPS
      })
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
