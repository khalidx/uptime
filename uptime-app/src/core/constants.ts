import AWS from 'aws-sdk'

import { Table } from './crud'

const dynamodb = new AWS.DynamoDB.DocumentClient()

function getClientForTable (environmentVariable: string | undefined): Table {
  if (!environmentVariable || environmentVariable.length == 0) throw new Error('Missing DynamoDb table name.')
  return {
    name: environmentVariable,
    client: dynamodb
  }
}

export const servicesTable = getClientForTable(process.env.SERVICES_TABLE)
export const metricsTable = getClientForTable(process.env.METRICS_TABLE)
