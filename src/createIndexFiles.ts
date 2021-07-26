import { AssetsConfig } from "./index"
import { execSync } from "child_process"
import fs from "fs"

export const createIndexFiles = (args, config: AssetsConfig) => {
  if (!(config.indexFiles && config.indexFiles.length)) {
    return
  }

  if (!fs.existsSync(`${config.rootPath}/dist`)) {
    console.error(
      `${config.rootPath}/dist does not exist. Please generate the assets first`
    )
    process.exit(1)
  }

  config.indexFiles.forEach((file) => {
    execSync(
      `npx create-index-normalized ${config.rootPath}/dist/${file.path} -x ${file.extension}`
    )
  })
}
