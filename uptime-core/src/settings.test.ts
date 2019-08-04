import test from 'ava'
import equal from 'deep-equal'

import AWS from 'aws-sdk'

import Settings from './settings'

let settings: Settings

test.before(async t => {
  let servicesTable = {
    name: 'uptime-app-dev-services',
    client: new AWS.DynamoDB.DocumentClient()
  }
  settings = new Settings(servicesTable)
})

test('can read, update, and delete settings', async t => {
  // read
  let originalSettings = await settings.read()
  // update
  await settings.update({
    title: 'test-title'
  })
  // read
  let result = await settings.read()
  t.true(result.title === 'test-title')
  // delete
  await settings.delete()
  // read (should return default settings)
  result = await settings.read()
  t.true(result.title === 'API')
  // if original settings are different than the defaults, return it
  //   to the table (for clean, non-destructive testing)
  if (!equal(originalSettings, result)) await settings.update(originalSettings)
})

test('cannot list or create settings', async t => {
  await t.throwsAsync(settings.list())
  await t.throwsAsync(settings.create())
})
