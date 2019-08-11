import test from 'ava'
import equal from 'deep-equal'

import * as settings from './settings'

test('can read, update, and delete settings', async t => {
  // read
  let originalSettings = await settings.read()
  // update
  await settings.update({
    title: 'test-title'
  })
  // read
  let result = await settings.read()
  t.true(result && result.title === 'test-title')
  // delete
  await settings.del()
  // read (should return default settings)
  result = await settings.read()
  t.true(result && result.title === 'API')
  // if original settings are different than the defaults, return it
  //   to the table (for clean, non-destructive testing)
  if (originalSettings && !equal(originalSettings, result)) await settings.update(originalSettings)
})
