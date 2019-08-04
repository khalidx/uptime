import AWS from 'aws-sdk'

export type Table = {
  name: string
  client: AWS.DynamoDB.DocumentClient
}

export type Identifiable = {
  id: string
}

export type Service = {
  name: string
}

export type IdentifiableService = Identifiable & Service

export type IdentifiableServices = Array<IdentifiableService>
