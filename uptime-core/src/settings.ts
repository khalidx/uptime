import { Table, Settings } from './types'

/**
 * Reads the settings record from the services table. If the settings
 *   record doesn't already exist, it returns default settings.
 */
export async function readSettings (table: Table): Promise<Settings> {
  let response = await table.client.get({
    TableName: table.name,
    Key: {
      id: 'settings'
    }
  }).promise()
  return (response.Item) ? response.Item as Settings : {
    title: 'API'
  }
}

/**
 * Updates the settings record in the services table. If the settings
 *   record doesn't already exist, it is created.
 */
export async function updateSettings (table: Table, settings: Settings): Promise<void> {
  await table.client.put({
    TableName: table.name,
    Item: {
      ...settings,
      id: 'settings'
    }
  }).promise()
}

/**
 * Deletes the settings record in the services table.
 */
export async function deleteSettings (table: Table): Promise<void> {
  await table.client.delete({
    TableName: table.name,
    Key: {
      id: 'settings'
    }
  }).promise()
}
