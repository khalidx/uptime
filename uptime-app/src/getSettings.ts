import 'source-map-support/register'
import { APIGatewayProxyHandler } from 'aws-lambda'

import Settings from './types/settings'
import DynamoDb from './utilities/dynamoDb'
import Response from './utilities/response'

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('Reading from the database ...')
    let settings = await getSettings()
    console.log('Responding with status:success ...')
    return Response(200, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error(error.message)
    console.log('Responding with status:error ...')
    return Response(500, JSON.stringify({ message: 'Internal server error.' }))
  }
}

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
