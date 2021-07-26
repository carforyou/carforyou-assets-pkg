import path from "path"
import upperFirst from "lodash.upperfirst"
import camelCase from "lodash.camelcase"
import glob from "glob"
import fs from "fs-extra"
import svgr from "@svgr/core"

import { Debugger } from "./Debugger"

import { AssetsConfig } from "./index"

const svgrOptions = {
  dimensions: false, // we want direct control over dimensions
  icon: true, // preserve viewBox property
  replaceAttrValues: {
    // map all relevant fills to currentColor
    "#222": "currentColor",
    "#232A36": "currentColor",
    "#323232": "currentColor",
    "#F73B47": "currentColor",
    "#FF301C": "currentColor",
    "#FFFFFF": "currentColor",
  },
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

    Debugger.log(
      `Generate tsx component of ${sourceFile} from path ${dirPath} to path ${outPath}`
    )

    const svgCode = fs.readFileSync(sourceFile).toString()

    const componentCode = svgr.sync(svgCode, svgrOptions, {
      componentName: upperFirst(outFileName + componentNameSuffix),
    })

    fs.writeFileSync(outPath, componentCode)
  })
}
