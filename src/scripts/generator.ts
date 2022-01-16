import { writeFile } from 'fs-extra'
import { join } from 'path'
import { compileFile } from 'pug'

import { formatter } from '../utils/formatter'
import { slugify } from '../utils/helpers'

import type { ValidatedResult } from './validator'
import type { Directories } from './createDirs'

export class Generator {
  compiledTemplate: ReturnType<typeof compileFile>
  dirs: Directories
  files: ValidatedResult

  constructor(
    files: ValidatedResult,
    dirs: Directories,
    template: string = 'base'
  ) {
    this.files = files
    this.dirs = dirs
    const templatePath = join(dirs.templatesDir, template) + '.pug'
    this.compiledTemplate = compileFile(templatePath, { doctype: 'html' })
  }

  async generatePages() {
    const promises = this.files.map(async ({ config, theme }) => {
      const fileName = `${config.slug || slugify(config.title)}.html`
      const fileContent = this.compiledTemplate({ ...config, theme })
      const formattedFileContent = formatter(fileContent)
      const newFilePath = join(this.dirs.resourcesDir, fileName)
      await writeFile(newFilePath, formattedFileContent, { encoding: 'utf8' })

      return { path: newFilePath, config, theme }
    })

    try {
      return await Promise.all(promises)
    } catch (e) {
      throw e
    }
  }
}

export type GeneratedResult = Awaited<
  ReturnType<InstanceType<typeof Generator>['generatePages']>
>
