import { pathExists, readdir, readFile } from 'fs-extra'
import { sep } from 'path'

import { schema, ILinkConfig } from '../utils/schema'
import type { Directories } from './createDirs'

export class Validator {
  #dataDir: string
  #themesDir: string

  constructor(directories: Directories) {
    this.#dataDir = directories.dataDir
    this.#themesDir = directories.themesDir
  }

  /**
   * validate the given data
   */
  async #validateSchema(data: string): Promise<ILinkConfig> {
    try {
      return await schema.parseAsync(data)
    } catch (e) {
      console.log('thrown from here', e)
      throw e
    }
  }

  /**
   * verify if the theme exists
   */
  async #verifyThemeExists(theme: string) {
    try {
      const themePath = this.#themesDir + sep + theme + '.css'
      if (await pathExists(themePath)) {
        return await readFile(themePath, 'utf8')
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   * list all .json files in the data directory and return absolute path of each file
   */
  async #listAllDataFiles() {
    const files = await readdir(this.#dataDir)
    return files
      .filter(name => name.endsWith('.json'))
      .map(name => this.#dataDir + sep + name)
  }

  /**
   * read the given file, validates the schema and returns the parsed file
   */
  async #readDataAndValidate(file: string) {
    try {
      const fileContent = await readFile(file, { encoding: 'utf-8' })
      const content = JSON.parse(fileContent)
      const validated = await this.#validateSchema(content)

      // return the theme location if exists
      let themeData: string | null = null
      if (typeof validated.theme === 'string') {
        themeData = await this.#verifyThemeExists(validated.theme)
        if (themeData === null) {
          console.warn(
            `Theme ${validated.theme} not found, using default theme`
          )
        }
      }

      return { config: validated, theme: themeData }
    } catch (e) {
      throw new Error(
        `Couldn't read file ${file}, please check if the format is correct \n ${e}`
      )
    }
  }

  /**
   * main function
   */
  async validate() {
    const files = await this.#listAllDataFiles()
    return await Promise.all(files.map(file => this.#readDataAndValidate(file)))
  }
}

export type ValidatedResult = Awaited<
  ReturnType<InstanceType<typeof Validator>['validate']>
>
