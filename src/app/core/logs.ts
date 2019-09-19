import KoaRouter from 'koa-router'

import { pingerLogs } from './clients'
import { Log } from './types'

export const list = async (): Promise<Array<Log>> => {
  let streams = await pingerLogs.client.describeLogStreams({
    logGroupName: pingerLogs.name,
    orderBy: 'LastEventTime',
    descending: true,
    limit: 1
  }).promise()
  if (!streams.logStreams || streams.logStreams.length == 0) return []
  if (!streams.logStreams[0].logStreamName) return []
  let logs = await pingerLogs.client.getLogEvents({
    logGroupName: pingerLogs.name,
    logStreamName: streams.logStreams[0].logStreamName,
    limit: 100,
    startFromHead: false
  }).promise()
  if (!logs.events) return []
  return logs.events.map(log => {
    delete log.ingestionTime
    return log as Log
  })
}

export const router = new KoaRouter()
.get('/logs', async (ctx, next) => {
  ctx.body = await list()
  ctx.status = 200
  await next()
})
