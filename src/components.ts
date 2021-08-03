import path from "path"
import upperFirst from "lodash.upperfirst"
import camelCase from "lodash.camelcase"
import glob from "glob"
import fs from "fs-extra"
import svgr from "@svgr/core"

import { AssetsConfig } from "./loadConfiguration"
import { nameSuffix } from "./helpers/nameHelper"
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
    titleProp: true,
    typescript: true,
    replaceAttrValues,
  }
}

export const components = (args, config: AssetsConfig) => {
  const sources = glob.sync(`${config.rootPath}/dist/**/**/*.svg`)
  const svgrConfig = getSvgrOptions(config)
  Debugger.log("Loaded svgr config: " + JSON.stringify(svgrConfig))
  sources.forEach((sourceFile) => {
    const outFileName = camelCase(path.basename(sourceFile, ".svg"))
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
