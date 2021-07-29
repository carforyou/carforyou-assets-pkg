import svgo, { extendDefaultPlugins } from "svgo"
import path from "path"
import glob from "glob"
import fs from "fs-extra"

import { AssetsConfig } from "./loadConfiguration"
import { Debugger } from "./debugger"

const svgoConfig = {
  plugins: extendDefaultPlugins([
    {
      name: "removeViewBox",
      active: false,
    },
  ]),
}

export const optimize = (args, config: AssetsConfig) => {
  const srcDir = `${config.rootPath}/src`
  const distDir = `${config.rootPath}/dist`

  if (!fs.existsSync(srcDir)) {
    console.error(
      `${srcDir} does not exist. Please place your svg assets in an src folder`
    )
    process.exit(1)
  }

  const sources = glob.sync(`${srcDir}/**/**/*.svg`)
  sources.forEach((sourceFile) => {
    const dirPath = path.dirname(sourceFile).replace(srcDir, distDir)
    fs.mkdirSync(dirPath, { recursive: true })
    const outPath = sourceFile.replace(srcDir, distDir)
    Debugger.log(`Optimize source file ${sourceFile} to path ${outPath}`)
    const svg = fs.readFileSync(sourceFile)

    const optimizedSvg = svgo.optimize(svg, svgoConfig)
    fs.writeFileSync(outPath, optimizedSvg.data)
  })
}