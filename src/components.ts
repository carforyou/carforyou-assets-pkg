import path from "path"
import upperFirst from "lodash.upperfirst"
import glob from "glob"
import fs from "fs-extra"
import svgr from "@svgr/core"

import { AssetsConfig } from "./loadConfiguration"
import { fileName, nameSuffix } from "./helpers/nameHelper"
import { Debugger } from "./debugger"

const getSvgrOptions = (config: AssetsConfig) => {
  const replaceAttrValues = {}

  if (config.replaceColors) {
    config.replaceColors.forEach((color) => {
      replaceAttrValues[color] = "currentColor"
    })
  }

  return {
    dimensions: false, // we want direct control over dimensions
    icon: true, // preserve viewBox property
    replaceAttrValues,
  }
}

export const components = (args, config: AssetsConfig) => {
  const sources = glob.sync(`${config.rootPath}/dist/**/**/*.svg`)
  const svgrConfig = getSvgrOptions(config)
  Debugger.log("Loaded svgr config: " + JSON.stringify(svgrConfig))
  sources.forEach((sourceFile) => {
    const outFileName = fileName(sourceFile)
    const dirPath = path.dirname(sourceFile)
    const outPath = path.join(dirPath, `${outFileName}.tsx`)
    const componentName = upperFirst(outFileName + nameSuffix(sourceFile))

    Debugger.log(
      `Generate tsx component of ${sourceFile} to path ${outPath} with the name ${componentName}`
    )

    const svgCode = fs.readFileSync(sourceFile).toString()
    const componentCode = svgr.sync(svgCode, svgrConfig, {
      componentName,
    })
    fs.writeFileSync(outPath, componentCode)
  })
}
