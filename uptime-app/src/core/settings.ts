import Joi from '@hapi/joi'

import CRUD, { Table, Identifiable } from './crud'

export type Settings = {
  title: string
}

export const settingsSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required()
})

export default class extends CRUD<Settings> {
  constructor (table: Table) {
    super(table, 'settings')
  }
  public async list (): Promise<Array<Identifiable & Settings>> {
    throw new Error('Illegal operation. list() is not applicable for Settings')
  }
  public async create (): Promise<Identifiable & Settings> {
    throw new Error('Illegal operation. create() is not applicable for Settings')
  }
  public async read () {
    let settings = await super.read({ id: 'settings' })
    return (settings) ? settings : {
      id: 'settings',
      title: 'API'
    }
  }
  public async update (settings: Settings) {
    await this.table.client.put({
      TableName: this.table.name,
      Item: {
        ...settings,
        id: 'settings'
      }
    }).promise()
  }
  public async delete () {
    return await super.delete({ id: 'settings' })
  }
}
