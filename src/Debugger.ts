export class Debugger {
  private static instance: Debugger
  private isDebugMode = false

  private constructor() {}

  public static setIsDebugMode(debug: boolean) {
    if (!Debugger.instance) {
      Debugger.instance = new Debugger()
    }
    Debugger.instance.isDebugMode = debug
  }

  public static log(message: string) {
    if (!Debugger.instance) {
      Debugger.instance = new Debugger()
    }

    if (!Debugger.instance.isDebugMode) {
      return
    }

    console.info(message)
  }
}
