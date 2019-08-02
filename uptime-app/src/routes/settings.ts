import KoaRouter from 'koa-router'

import Settings, { schema } from '../types/settings'
import HttpError from '../types/httpError'
import Validate from '../utilities/validate'
import DynamoDb from '../utilities/dynamoDb'

export async function getSettings (): Promise<Settings> {
  let table = process.env.DYNAMODB_TABLE
  if (!table) throw new Error('Missing DynamoDb table name.')
  let response = await DynamoDb.get({
    TableName: table,
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
  let table = process.env.DYNAMODB_TABLE
  if (!table) throw new Error('Missing DynamoDb table name.')
  await DynamoDb.update({
    TableName: table,
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
