import { get } from './get'
import { create } from './create'
import { remove } from './remove'
import { format } from './format'
import { insert } from './insert'
import { Response } from '../reply'

export enum CommandType {
  Format = 'format',
  Insert = 'insert',
  Get = 'get',
  Create = 'create',
  Delete = 'delete',
}

export const commands: { [K in CommandType]: (...args: string[]) => Response} = {
  [CommandType.Get]: get,
  [CommandType.Create]: create,
  [CommandType.Delete]: remove,
  [CommandType.Format]: format,
  [CommandType.Insert]: insert,
}
