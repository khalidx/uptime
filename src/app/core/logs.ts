import KoaRouter from 'koa-router'
import { CloudWatchLogs } from 'aws-sdk'

import { Log } from './types'

const cloudwatchlogs = new CloudWatchLogs()

export const list = async (): Promise<Array<Log>> => {
  if (!process.env.LOG_GROUP) throw new Error('No log group specified')
  let streams = await cloudwatchlogs.describeLogStreams({
    logGroupName: process.env.LOG_GROUP,
    orderBy: 'LastEventTime',
    descending: true,
    limit: 1,
  }).promise()
  if (!streams.logStreams || streams.logStreams.length == 0) return []
  if (!streams.logStreams[0].logStreamName) return []
  let logs = await cloudwatchlogs.getLogEvents({
    logGroupName: process.env.LOG_GROUP,
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
