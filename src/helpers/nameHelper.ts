import path from "path"
import upperFirst from "lodash.upperfirst"
import camelCase from "lodash.camelcase"

export const nameSuffix = (sourceFile: string) => {
  return upperFirst(
    path.dirname(sourceFile).split(path.sep).slice(-1)[0]
  ).replace(/s$/, "")
}

export const fileName = (sourceFile: string) => {
  return camelCase(path.basename(sourceFile, ".svg"))
}
