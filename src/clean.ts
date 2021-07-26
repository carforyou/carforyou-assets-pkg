import fs from "fs-extra"

import { AssetsConfig } from "./index"

export const clean = (args, config: AssetsConfig) => {
  fs.removeSync(`${config.rootPath}/dist`)
}
