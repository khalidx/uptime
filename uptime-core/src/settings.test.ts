import test from 'ava'
import equal from 'deep-equal'

import AWS from 'aws-sdk'

import { Table } from './types'
import { readSettings, updateSettings, deleteSettings } from './settings'

let servicesTable: Table

test.before(async t => {
  servicesTable = {
    name: 'uptime-app-dev-services',
    client: new AWS.DynamoDB.DocumentClient()
  }
})

test('can read, update, and delete settings', async t => {
  // read
  let originalSettings = await readSettings(servicesTable)
  // update
  await updateSettings(servicesTable, {
    title: 'test-title'
  })
  // read
  let result = await readSettings(servicesTable)
  t.true(result.title === 'test-title')
  // delete
  await deleteSettings(servicesTable)
  // read (should return default settings)
  result = await readSettings(servicesTable)
  t.true(result.title === 'API')
  // if original settings are different than the defaults, return it
  //   to the table (for clean, non-destructive testing)
  if (!equal(originalSettings, result)) await updateSettings(servicesTable, originalSettings)
})
