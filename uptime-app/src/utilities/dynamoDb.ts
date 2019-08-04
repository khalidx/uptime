import AWS from 'aws-sdk'

export interface Table {
  tableName: string
  client: AWS.DynamoDB.DocumentClient
}

const dynamodb = new AWS.DynamoDB.DocumentClient()

function getClientForTable (environmentVariable: string | undefined): Table {
  if (!environmentVariable) throw new Error('Missing DynamoDb table name.')
  return {
    tableName: environmentVariable,
    client: dynamodb
  }
}

export const servicesTable = getClientForTable(process.env.SERVICES_TABLE)
export const metricsTable = getClientForTable(process.env.METRICS_TABLE)
