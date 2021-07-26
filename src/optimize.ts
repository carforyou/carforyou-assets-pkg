import svgo, { extendDefaultPlugins } from "svgo"
import path from "path"
import glob from "glob"
import fs from "fs-extra"
import { AssetsConfig } from "./index"

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
    const dirPath = path.dirname(sourceFile).replace("/src", "/dist")
    fs.mkdirSync(dirPath, { recursive: true })
    const outPath = sourceFile.replace("/src/", "/dist/")
    const svg = fs.readFileSync(sourceFile)

    const optimizedSvg = svgo.optimize(svg, svgoConfig)
    fs.writeFileSync(outPath, optimizedSvg.data)
  })
}
