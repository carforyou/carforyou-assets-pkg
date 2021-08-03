import path from "path"
import upperFirst from "lodash.upperfirst"

export const nameSuffix = (sourceFile: string) => {
  return upperFirst(
    path.dirname(sourceFile).split(path.sep).slice(-1)[0]
  ).replace(/s$/, "")
}
