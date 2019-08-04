import test from 'ava'

import AWS from 'aws-sdk'

import { Table } from './types'
import { listServices, createService, readService, updateService, deleteService } from './services'

let servicesTable: Table

test.before(async t => {
  servicesTable = {
    name: 'uptime-app-dev-services',
    client: new AWS.DynamoDB.DocumentClient()
  }
})

test('can list services', async t => {
  // create
  let service1 = await createService(servicesTable, {
    name: 'test-service-1'
  })
  let service2 = await createService(servicesTable, {
    name: 'test-service-2'
  })
  // list
  let result = await listServices(servicesTable)
  t.true(result.some(service => service.id === service1.id))
  t.true(result.some(service => service.id === service2.id))
  // delete
  await deleteService(servicesTable, service1)
  await deleteService(servicesTable, service2)
})

test('can CRUD a service', async t => {
  // create
  let result = await createService(servicesTable, {
    name: 'test-created'
  })
  t.true(result && result.id && result.id.length > 0)
  t.true(result.name && result.name === 'test-created')
  // read
  result = await readService(servicesTable, { id: result.id })
  t.true(result && result.name === 'test-created')
  // update
  result.name = 'test-updated'
  await updateService(servicesTable, result)
  result = await readService(servicesTable, { id: result.id })
  t.true(result && result.name === 'test-updated')
  // delete
  await deleteService(servicesTable, { id: result.id })
})

test('throws an error when reading a service that does not exist', async t =>{
  let result = await t.throwsAsync(readService(servicesTable, { id: 'this-id-does-not-exist' }))
  t.true(result.message === 'Service this-id-does-not-exist does not exist')
})
