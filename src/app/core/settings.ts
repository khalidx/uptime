import KoaRouter from 'koa-router'

import { servicesTable } from './tables'
import { 
  HttpCompatibleError,
  Settings, updateSettingsSchema
} from './types'

export const read = async (): Promise<Settings | undefined> => {
  let response = await servicesTable.client.get({
    TableName: servicesTable.name,
    Key: {
      id: 'settings'
    },
    ProjectionExpression: '#title',
    ExpressionAttributeNames: {
      '#title': 'title'
    }
  }).promise()
  return response.Item as Settings | undefined
}

export const update = async (updateSettings: Settings): Promise<Settings> => {
  let validation = updateSettingsSchema.validate(updateSettings, { abortEarly: false, allowUnknown: false })
  if (validation.error) throw new HttpCompatibleError(400, 'Bad request')
  await servicesTable.client.put({
    TableName: servicesTable.name,
    Item: {
      ...validation.value,
      id: 'settings'
    }
  }).promise()
  return validation.value
}

export const del = async (): Promise<void> => {
  await servicesTable.client.delete({
    TableName: servicesTable.name,
    Key: {
      id: 'settings'
    }
  }).promise()
}

export const router = new KoaRouter()
.get('/settings', async (ctx, next) => {
  let result = await read()
  if (!result) result = { title: 'API' }
  ctx.body = result
  ctx.status = 200
  await next()
})
.put('/settings', async (ctx, next) => {
  ctx.body = await update(ctx.request.body)
  ctx.status = 200
  await next()
})
.del('/services/:id', async (ctx, next) => {
  await del()
  ctx.status = 204
  await next()
})
