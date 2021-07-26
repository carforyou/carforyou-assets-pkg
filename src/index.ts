import path from "path"
import fs from "fs"

import { unknown } from "./unknown"
import { optimize } from "./optimize"
import { Debugger } from "./Debugger"
import { createIndexFiles } from "./createIndexFiles"
import { components } from "./components"
import { clean } from "./clean"
import { build } from "./build"

interface IndexFile {
  path: string
  extension: "tsx" | "svg"
}

export interface AssetsConfig {
  rootPath: string
  indexFiles?: IndexFile[]
  debug?: boolean
}

const loadConfiguration = (): AssetsConfig => {
  const configPath = path.join(process.cwd(), "assets.config.json")

  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath).toString())
  } else {
    return {
      rootPath: "./assets",
      indexFiles: [],
    }
  }
}

export default function run(args) {
  const selectedCommand = args[2]
  const config = loadConfiguration()
  Debugger.setIsDebugMode(config.debug)
  Debugger.log("Loaded config " + JSON.stringify(config))

  const commands = {
    build,
    clean,
    components,
    optimize,
    index: createIndexFiles,
  }

  const command = commands[selectedCommand]
  Debugger.log("Command selected " + command)
  command ? command(args, config) : unknown(Object.keys(commands))
  process.exit(0)
}
