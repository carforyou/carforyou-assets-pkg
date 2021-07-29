import fs from "fs"
import { execSync } from "child_process"
import { writeIndex } from "create-index-normalized"

import { AssetsConfig } from "./loadConfiguration"

export const createIndexFiles = (args, config: AssetsConfig) => {
  if (!(config.indexFiles && config.indexFiles.length)) {
    console.info(
      "Index was called but no path was provided. Please specify an index path in your assets.config.json"
    )
    return
  }

  if (!fs.existsSync(`${config.rootPath}/dist`)) {
    console.error(
      `${config.rootPath}/dist does not exist. Please generate the assets first`
    )
    process.exit(1)
  }

  config.indexFiles.forEach((file) => {
    writeIndex([`${config.rootPath}/dist/${file.path}`], {
      extensions: [file.extension],
    })
  })
}
