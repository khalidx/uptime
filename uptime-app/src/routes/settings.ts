import KoaRouter from 'koa-router'

import Settings, { schema } from '../types/settings'
import HttpError from '../types/httpError'
import Validate from '../utilities/validate'
import { servicesTable } from '../utilities/dynamoDb'

export async function getSettings (): Promise<Settings> {
  let response = await servicesTable.client.get({
    TableName: servicesTable.tableName,
    Key: {
      id: 'settings'
    }
  }).promise()
  if (response.Item) return JSON.parse(response.Item.json) as Settings
  return {
    title: 'API'
  }
}

export async function putSettings (settings: Settings): Promise<void> {
  await servicesTable.client.update({
    TableName: servicesTable.tableName,
    Key: {
      id: 'settings'
    },
    ExpressionAttributeNames: {
      '#settings': 'json',
    },
    ExpressionAttributeValues: {
      ':settings': JSON.stringify(settings)
    },
    UpdateExpression: 'SET #settings = :settings',
    ReturnValues: 'ALL_NEW'
  }).promise()
}

export default new KoaRouter()

.get('/', async (ctx, next) => {
  ctx.body = await getSettings()
  await next()
})

.put('/', async (ctx, next) => {
  const validation = Validate<Settings>(schema, ctx.request.body)
  if (validation.error) throw new HttpError(400, 'Bad request')
  ctx.body = await putSettings(validation.value)
  await next()
})
