import svgo from "svgo"
import path from "path"
import glob from "glob"
import fs from "fs-extra"

import { pluginAddTitle } from "./svgoPlugins/pluginAddTitle"
import { AssetsConfig } from "./loadConfiguration"
import { nameSuffix } from "./helpers/nameHelper"
import { Debugger } from "./debugger"

const getConfig = (options: { accessibilityTitle: string }) => {
  return {
    multipass: true,
    floatPrecision: 2,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeTitle: false,
            removeDesc: false,
          },
        },
      },
      {
        name: "accessibility",
        description: "make svg accessible",
        type: "full",
        params: {
          title: options.accessibilityTitle,
        },
        fn: pluginAddTitle,
      },
    ],
  }
}

const getAccessibilityTitle = (sourceFile: string) => {
  const title = path.basename(sourceFile, ".svg").split("-").join(" ")
  return nameSuffix(sourceFile) === "Src"
    ? title
    : `${title} ${nameSuffix(sourceFile)}`
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

    const accessibilityTitle = getAccessibilityTitle(sourceFile).toLowerCase()

    const optimizedSvg = svgo.optimize(svg, getConfig({ accessibilityTitle }))
    fs.writeFileSync(outPath, optimizedSvg.data)
  })
}
