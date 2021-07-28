import fs from "fs-extra"

import { AssetsConfig } from "./loadConfiguration"

export const clean = (args, config: AssetsConfig) => {
  fs.removeSync(`${config.rootPath}/dist`)
}
