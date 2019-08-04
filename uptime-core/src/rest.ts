import KoaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
import Joi from '@hapi/joi'

import CRUD from './crud'

export class HttpError extends Error {
  'x-status': number
  'x-message': string
  constructor(status: number, message: string) {
    super(message)
    this['x-status'] = status
    this['x-message'] = message
  }
}

export function validate<Type> (schema: Joi.ObjectSchema, object: any): Joi.ValidationResult<Type> {
  return schema.validate<Type>(object, { abortEarly: false, allowUnknown: false })
}

export function list<Type> (crud: CRUD<Type>): KoaRouter.IMiddleware {
  return async (ctx, next) => {
    ctx.body = await crud.list()
    ctx.status = 200
    await next()
  }
}

export function create<Type> (crud: CRUD<Type>, schema: Joi.ObjectSchema): KoaRouter.IMiddleware {
  return async (ctx, next) => {
    let validation = validate<Type>(schema, ctx.request.body)
    if (validation.error) throw new HttpError(400, 'Bad request')
    ctx.body = await crud.create(validation.value)
    ctx.status = 201
    await next()
  }
}

export function read<Type> (crud: CRUD<Type>): KoaRouter.IMiddleware {
  return async (ctx, next) => {
    let result = await crud.read({ id: ctx.params.id })
    if (!result) throw new HttpError(404, 'Not found')
    ctx.body = result
    ctx.status = 200
    await next()
  }
}

export function update<Type> (crud: CRUD<Type>, schema: Joi.ObjectSchema): KoaRouter.IMiddleware {
  return async (ctx, next) => {
    let validation = validate<Type>(schema, ctx.request.body)
    if (validation.error) throw new HttpError(400, 'Bad request')
    let result = await crud.read({ id: ctx.params.id })
    if (!result) throw new HttpError(404, 'Not found')
    // todo: only update allowed fields. also 1 call not two
    await crud.update({
      ...result,
      ...validation.value
    })
    ctx.status = 204
    await next()
  }
}

export function del<Type> (crud: CRUD<Type>): KoaRouter.IMiddleware {
  return async (ctx, next) => {
    await crud.delete({ id: ctx.params.id })
    ctx.status = 204
    await next()
  }
}
