import 'source-map-support/register'
import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = async (event, context) => {
  try {
    console.log('Reading from the database ...')
    console.log('Responding with status:success ...')
  } catch (error) {
    console.error(error.message)
    console.log('Responding with status:error ...')
  }
}

export async function pinger (): Promise<void> {

}
