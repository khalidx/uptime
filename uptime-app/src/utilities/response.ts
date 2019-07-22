import { APIGatewayProxyResult } from 'aws-lambda'

export default function respond (status: number, body: string): APIGatewayProxyResult {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
    body
  }
}
