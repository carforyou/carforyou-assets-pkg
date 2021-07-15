import unknown from "./unknown"

export default function run(args) {
  const selectedCommand = args[2]
  const commands = {
    clean: () => console.log("clean"),
    optimize: () => console.log("optimize"),
    components: () => console.log("components"),
    index: () => console.log("index"),
  }

  const command = commands[selectedCommand]
  command ? command(args) : unknown(Object.keys(commands))
}
