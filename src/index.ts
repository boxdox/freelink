import { createDirs } from './scripts/createDirs'
import { Generator } from './scripts/generator'
import { Validator } from './scripts/validator'

const main = async () => {
  const dirs = await createDirs()
  const validatedResult = await new Validator(dirs).validate()
  const generatedPages = await new Generator(
    validatedResult,
    dirs
  ).generatePages()
  console.log(generatedPages)
}

main().catch(console.error)
