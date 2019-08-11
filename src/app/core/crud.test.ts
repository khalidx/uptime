import test from 'ava'

import * as services from './services'

test('can create, list, read, and delete services', async t => {
  let samples = await services.listSamples()
  // create
  let item1 = await services.create(samples[0])
  t.true(item1.name === samples[0].name)
  let item2 = await services.create(samples[1])
  t.true(item2.name === samples[1].name)
  // list
  let result = await services.list()
  t.true(result.some(item => item.id === item1.id))
  t.true(result.some(item => item.id === item2.id))
  // read
  let read = await services.read(item1.id)
  t.true(read && read.name === item1.name)
  // delete
  await services.del(item1.id)
  await services.del(item2.id)
})
