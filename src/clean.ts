import { AssetsConfig } from "./index"
import fs from "fs-extra"

export const clean = (args, config: AssetsConfig) => {
  fs.removeSync(`${config.rootPath}/dist`)
}
