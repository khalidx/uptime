import AWS from 'aws-sdk'
import uuid from 'uuid/v4'

export type Table = {
  name: string
  client: AWS.DynamoDB.DocumentClient
}

export type Identifiable = {
  id: string
}

export default class CRUD<Type> {

  table: Table
  prefix?: string

  constructor (table: Table, prefix?: string) {
    this.table = table
    this.prefix = prefix
  }

  public async list (): Promise<Array<Identifiable & Type>> {
    let items: Array<Identifiable & Type> = []
    let request: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.table.name
    }
    if (this.prefix) {
      request.FilterExpression = 'begins_with (id, :prefix)'
      request.ExpressionAttributeValues = {
        ':prefix': this.prefix
      }
    }
    let dataLoaded = false
    let lastEvaluatedKey: AWS.DynamoDB.DocumentClient.Key | undefined = undefined
    while (!dataLoaded) {
      if (lastEvaluatedKey) request.ExclusiveStartKey = lastEvaluatedKey
      let response = await this.table.client.scan(request).promise()
      if (response.Items) items.push(...response.Items as Array<Identifiable & Type>)
      if (response.LastEvaluatedKey) lastEvaluatedKey = response.LastEvaluatedKey
      else dataLoaded = true
    }
    return items
  }

  public async create (item: Type): Promise<Identifiable & Type> {
    let itemWithId: Identifiable & Type = {
      ...item,
      id: this.prefix ? `${this.prefix}-${uuid()}` : uuid()
    }
    await this.table.client.put({
      TableName: this.table.name,
      ConditionExpression: 'attribute_not_exists (id)',
      Item: itemWithId
    }).promise()
    return itemWithId
  }

  public async read (item: Identifiable): Promise<Identifiable & Type> {
    let response = await this.table.client.get({
      TableName: this.table.name,
      Key: {
        id: item.id
      }
    }).promise()
    return response.Item as Identifiable & Type
  }

  public async update (item: Identifiable & Type): Promise<void> {
    await this.table.client.put({
      TableName: this.table.name,
      ConditionExpression: 'attribute_exists (id)',
      Item: item
    }).promise()
  }

  public async delete (item: Identifiable): Promise<void> {
    await this.table.client.delete({
      TableName: this.table.name,
      Key: {
        id: item.id
      }
    }).promise()
  }

}
