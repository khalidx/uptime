import 'source-map-support/register'
import { APIGatewayProxyHandler } from 'aws-lambda'

import Settings, { schema } from './types/settings'
import Validate from './utilities/validate'
import DynamoDb from './utilities/dynamoDb'
import Response from './utilities/response'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('Validating the request ...')
    const validation = Validate<Settings>(schema, event.body)
    if (validation.error) return Response(400, JSON.stringify({ message: 'Bad request.' }))
    console.log('Saving to the database ...')
    await putSettings(validation.value)
    console.log('Responding with status:success ...')
    return Response(204, '')
  } catch (error) {
    console.error(error.message)
    console.log('Responding with status:error ...')
    return Response(500, JSON.stringify({ message: 'Internal server error.' }))
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
