import { createDirs } from './scripts/createDirs'
import { Generator } from './scripts/generator'
import { Validator } from './scripts/validator'
import { Bundler } from './scripts/bundler'

const main = async () => {
  const dirs = await createDirs()
  const validatedResult = await new Validator(dirs).validate()
  await new Generator(validatedResult, dirs).generatePages()
  await new Bundler(dirs).bundle()
}

main().catch(console.error)
