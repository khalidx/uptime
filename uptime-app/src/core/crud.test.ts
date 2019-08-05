import test from 'ava'

import AWS from 'aws-sdk'

import CRUD from './crud'

let crud: CRUD<{ name: string }>

test.before(async t => {
  let servicesTable = {
    name: 'uptime-app-dev-services',
    client: new AWS.DynamoDB.DocumentClient()
  }
  crud = new CRUD(servicesTable, 'service')
})

test('can list items', async t => {
  // create
  let item1 = await crud.create({ name: 'test-service-1' })
  let item2 = await crud.create({ name: 'test-service-2' })
  // list
  let result = await crud.list()
  t.true(result.some(item => item.id === item1.id))
  t.true(result.some(item => item.id === item2.id))
  // delete
  await crud.delete(item1)
  await crud.delete(item2)
})

test('can create, read, update, and delete an item', async t => {
  // create
  let result = await crud.create({ name: 'test-created' })
  t.true(result && result.id && result.id.length > 0)
  t.true(result.name && result.name === 'test-created')
  // read
  result = await crud.read(result)
  t.true(result && result.name === 'test-created')
  // update
  result.name = 'test-updated'
  await crud.update(result)
  result = await crud.read(result)
  t.true(result && result.name === 'test-updated')
  // delete
  await crud.delete(result)
})
