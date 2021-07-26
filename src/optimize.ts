import svgo, { extendDefaultPlugins } from "svgo"
import path from "path"
import glob from "glob"
import fs from "fs-extra"

import { AssetsConfig } from "./index"
import { Debugger } from "./Debugger"

const svgoConfig = {
  plugins: extendDefaultPlugins([
    {
      name: "removeViewBox",
      active: false,
    },
  ]),
}

export const optimize = (args, config: AssetsConfig) => {
  const sources = glob.sync(`${config.rootPath}/src/**/**/*.svg`)
  sources.forEach((sourceFile) => {
    Debugger.log("Optimize source file " + sourceFile)
    const dirPath = path.dirname(sourceFile).replace("/src", "/dist")
    fs.mkdirSync(dirPath, { recursive: true })
    const outPath = sourceFile.replace("/src/", "/dist/")
    Debugger.log(
      `Optimize source file ${sourceFile} from path ${dirPath} to path ${outPath}`
    )
    const svg = fs.readFileSync(sourceFile)

    const optimizedSvg = svgo.optimize(svg, svgoConfig)
    fs.writeFileSync(outPath, optimizedSvg.data)
  })
}
