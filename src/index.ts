import { createDirs } from './scripts/createDirs'
import { Validator } from './scripts/validator'

const main = async () => {
  const dirs = await createDirs()
  new Validator(dirs).validate().then(console.log).catch(console.error)
}

main().catch(console.error)
