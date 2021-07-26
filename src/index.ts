import path from "path"
import fs from "fs"
import unknown from "./unknown"
import { optimize } from "./optimize"
import { components } from "./components"
import { clean } from "./clean"

export interface AssetsConfig {
  rootPath: string
}

const loadConfiguration = (): AssetsConfig => {
  const configPath = path.join(process.cwd(), "assets.config.json")

  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath).toString())
  } else {
    return {
      rootPath: "./assets",
    }
  }
}

export default function run(args) {
  const selectedCommand = args[2]
  const config = loadConfiguration()

  const commands = {
    clean,
    optimize,
    components,
    index: () => console.log("index"),
  }

  const command = commands[selectedCommand]
  command ? command(args, config) : unknown(Object.keys(commands))
  process.exit(0)
}
