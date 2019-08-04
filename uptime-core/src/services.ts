import uuid from 'uuid/v4'

import { Table, Identifiable, Service, IdentifiableService, IdentifiableServices } from './types'

/**
 * Reads all services from the services table
 */
export async function listServices (table: Table): Promise<IdentifiableServices> {
  let services: IdentifiableServices = []
  let dataLoaded = false
  while (!dataLoaded) {
    let response = await table.client.scan({
      TableName: table.name,
      FilterExpression: 'begins_with (id, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': 'service'
      }
    }).promise()
    if (response.Items) services.push(...response.Items as IdentifiableServices)
    if (!response.LastEvaluatedKey) dataLoaded = true
  }
  return services
}

/**
 * Creates a service record in the services table
 */
export async function createService (table: Table, service: Service): Promise<IdentifiableService> {
  let serviceWithId: IdentifiableService = {
    ...service,
    id: `service-${uuid()}`
  }  
  await table.client.put({
    TableName: table.name,
    ConditionExpression: 'attribute_not_exists (id)',
    Item: serviceWithId
  }).promise()
  return serviceWithId
}

/**
 * Reads a service record from the services table
 */
export async function readService (table: Table, service: Identifiable): Promise<IdentifiableService> {
  let response = await table.client.get({
    TableName: table.name,
    Key: {
      id: service.id
    }
  }).promise()
  return response.Item as IdentifiableService
}

/**
 * Updates a service record in the services table
 */
export async function updateService (table: Table, service: IdentifiableService): Promise<void> {
  await table.client.put({
    TableName: table.name,
    ConditionExpression: 'attribute_exists (id)',
    Item: service
  }).promise()
}

/**
 * Delete a service record from the services table
 */
export async function deleteService (table: Table, service: Identifiable): Promise<void> {
  await table.client.delete({
    TableName: table.name,
    Key: {
      id: service.id
    }
  }).promise()
}
