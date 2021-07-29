export const unknown = (availableCommands) => {
  console.info(`Available commands: ${availableCommands.join(", ")}`)
  process.exit(1)
}
