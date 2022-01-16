import { Parcel } from '@parcel/core'

import type { Directories } from './createDirs'

export class Bundler {
  #dirs: Directories
  constructor(dirs: Directories) {
    this.#dirs = dirs
  }

  async bundle() {
    const bundler = new Parcel({
      entries: this.#dirs.resourcesDir + '/*.html',
      defaultConfig: '@parcel/config-default',
      mode: 'production',
      defaultTargetOptions: {
        engines: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    })

    try {
      const { buildTime, bundleGraph } = await bundler.run()

      console.log(
        `Built ${bundleGraph.getBundles().length} bundles in ${buildTime}ms`
      )
    } catch (e) {
      console.log(JSON.stringify(e, null, 2))
    }
  }
}
