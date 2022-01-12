export const unknown = (availableCommands) => {
  console.log({availableCommands})
  console.info(`Available commands: ${availableCommands.join(", ")}`)
  process.exit(1)
}
