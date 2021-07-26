import { optimize } from "./optimize"
import { createIndexFiles } from "./createIndexFiles"
import { components } from "./components"
import { clean } from "./clean"

import { AssetsConfig } from "./index"

export const build = (args, config: AssetsConfig) => {
  clean(args, config)
  optimize(args, config)
  components(args, config)
  if (config.indexFiles && config.indexFiles.length) {
    createIndexFiles(args, config)
  }
}
