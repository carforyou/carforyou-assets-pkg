import path from "path"
import fs from "fs"

interface IndexFile {
  path: string
  extension: "tsx" | "svg"
}

export interface AssetsConfig {
  rootPath: string
  indexFiles?: IndexFile[]
  debug?: boolean
}

const defaultConfig = {
  rootPath: "./assets",
  indexFiles: [],
  debug: false,
}

export const loadConfiguration = (): AssetsConfig => {
  const configPath = path.join(process.cwd(), "assets.config.json")

  if (fs.existsSync(configPath)) {
    const parsedConfig = JSON.parse(fs.readFileSync(configPath).toString())
    validateConfiguration(parsedConfig)
    return { ...defaultConfig, ...parsedConfig }
  } else {
    return defaultConfig
  }
}

export const validateConfiguration = (config) => {
  const { rootPath, indexFiles, debug } = config || {}
  const errors = []

  rootPath && validateRootPath(rootPath, errors)
  indexFiles && validateIndexFiles(indexFiles, errors)
  debug && validateDebug(debug, errors)

  if (errors.length) {
    console.error("assets-pkg is not configured correctly")
    errors.forEach((err) => console.error(err))
    process.exit(1)
  }
}

const validateRootPath = (rootPath, errors: string[]) => {
  if (typeof rootPath !== "string") {
    errors.push("rootPath must be a string")
  }
}

const validateIndexFiles = (indexFiles, errors: string[]) => {
  if (!Array.isArray(indexFiles)) {
    errors.push("indexFiles must be an array")
  }
  if (
    indexFiles.length &&
    !indexFiles.every(
      (el) =>
        el &&
        el.path &&
        el.extension &&
        typeof el.path === "string" &&
        ["tsx", "svg"].includes(el.extension)
    )
  ) {
    errors.push(
      "Wrong structure for indexFiles. Please provide an array with the structure [{ path: string, extension: tsx | svg }]"
    )
  }
}

const validateDebug = (debug, errors: string[]) => {
  if (typeof debug !== "boolean") {
    errors.push("debug must be a boolean")
  }
}
