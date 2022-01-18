import { unknown } from "./unknown"
import { loadConfiguration } from "./loadConfiguration"
import { Debugger } from "./debugger"
import { clean } from "./clean"
import { build } from "./build"

export default function run(args) {
  const selectedCommand = args[2]
  const config = loadConfiguration()
  Debugger.setIsDebugMode(config.debug)
  Debugger.log("Loaded assets config " + JSON.stringify(config))

  const commands = {
    build,
    clean,
  }

  const command = commands[selectedCommand]
  command ? command(args, config) : unknown(Object.keys(commands))
  process.exit(0)
}
