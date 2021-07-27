import path from "path"
import upperFirst from "lodash.upperfirst"
import camelCase from "lodash.camelcase"
import glob from "glob"
import fs from "fs-extra"
import svgr from "@svgr/core"

import { Debugger } from "./debugger"

import { AssetsConfig } from "./index"

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
  sources.forEach((sourceFile) => {
    const outFileName = camelCase(path.basename(sourceFile, ".svg"))
    const componentNameSuffix = upperFirst(
      path.dirname(sourceFile).split(path.sep).slice(-1)[0]
    ).replace(/s$/, "")
    const dirPath = path.dirname(sourceFile)
    const outPath = path.join(dirPath, `${outFileName}.tsx`)
    const componentName = upperFirst(outFileName + componentNameSuffix)

    Debugger.log(
      `Generate tsx component of ${sourceFile} to path ${outPath} with the name ${componentName}`
    )

    const svgCode = fs.readFileSync(sourceFile).toString()
    const componentCode = svgr.sync(svgCode, getSvgrOptions(config), {
      componentName,
    })
    fs.writeFileSync(outPath, componentCode)
  })
}
