import { DynamoDB, S3, CloudWatchLogs } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()
const s3 = new S3()
const cloudwatchlogs = new CloudWatchLogs()

function getClientForTable (environmentVariable: string | undefined): { name: string, client: DynamoDB.DocumentClient } {
  if (!environmentVariable || environmentVariable.length == 0) throw new Error(`Missing DynamoDb table name.`)
  return { name: environmentVariable, client: dynamodb }
}

function getClientForBucket (environmentVariable: string | undefined): { name: string, client: S3 } {
  if (!environmentVariable || environmentVariable.length == 0) throw new Error(`Missing S3 bucket name.`)
  return { name: environmentVariable, client: s3 }
}

function getClientForLogs (environmentVariable: string | undefined): { name: string, client: CloudWatchLogs } {
  if (!environmentVariable || environmentVariable.length == 0) throw new Error(`Missing CloudWatch log group name.`)
  return { name: environmentVariable, client: cloudwatchlogs }
}

export const servicesTable = getClientForTable(process.env.SERVICES_TABLE)
export const metricsTable = getClientForTable(process.env.METRICS_TABLE)
export const storageBucket = getClientForBucket(process.env.STORAGE_BUCKET)
export const pingerLogs = getClientForLogs(process.env.PINGER_LOG_GROUP)
