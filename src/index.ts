import { createDirs } from './scripts/createDirs'
import { Generator } from './scripts/generator'
import { Validator } from './scripts/validator'

const main = async () => {
  const dirs = await createDirs()
  const validatedResult = await new Validator(dirs).validate()
  await new Generator(validatedResult, dirs).generatePages()
}

main().catch(console.error)
