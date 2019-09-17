import 'mocha'
import { expect } from 'chai'
import equal from 'deep-equal'

import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

import * as services from './services'
import * as settings from './settings'

describe('integration tests', () => {

  it('can create, list, read, and delete services', async () => {
    let samples = await services.listSamples()
    // create
    let item1 = await services.create(samples[0])
    expect(item1.name).to.equal(samples[0].name)
    let item2 = await services.create(samples[1])
    expect(item2.name).to.equal(samples[1].name)
    // list
    let result = await services.list()
    expect(result.some(item => item.id === item1.id)).to.be.true
    expect(result.some(item => item.id === item2.id)).to.be.true
    // read
    let read = await services.read(item1.id)
    expect(read && read.name === item1.name).to.be.true
    // delete
    await services.del(item1.id)
    await services.del(item2.id)
  })

  it('can read, update, and delete settings', async () => {
    // read
    let originalSettings = await settings.read()
    // update
    await settings.update({
      title: 'test-title'
    })
    // read
    let result = await settings.read()
    expect(result && result.title === 'test-title').to.be.true
    // delete
    await settings.del()
    // read (should return default settings)
    result = await settings.read()
    expect(result && result.title === 'API').to.be.true
    // if original settings are different than the defaults, return it
    //   to the table (for clean, non-destructive testing)
    if (originalSettings && !equal(originalSettings, result)) await settings.update(originalSettings)
  })

})
