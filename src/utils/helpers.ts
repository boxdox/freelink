import { resolve } from 'path'

export const r = (...args: string[]) => resolve(__dirname, '..', ...args)

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
