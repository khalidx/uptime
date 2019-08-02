export default class HttpError extends Error {
  'x-status': number
  'x-message': string
  constructor(status: number, message: string) {
    super(message)
    this['x-status'] = status
    this['x-message'] = message
  }
}
