import * as unknown from "../unknown"
import * as optimize from "../optimize"
import run from "../index"
import * as createIndexFiles from "../createIndexFiles"
import * as components from "../components"
import * as clean from "../clean"

jest.spyOn(process, "exit").mockImplementation()

describe("build assets", () => {
  it("should run all commands in the correct order when build is called", () => {
    const callOrder = []
    jest.spyOn(clean, "clean").mockImplementation(() => callOrder.push("clean"))
    jest
      .spyOn(optimize, "optimize")
      .mockImplementation(() => callOrder.push("optimize"))
    jest
      .spyOn(components, "components")
      .mockImplementation(() => callOrder.push("components"))
    jest
      .spyOn(createIndexFiles, "createIndexFiles")
      .mockImplementation(() => callOrder.push("index"))

    run([0, 0, "build"])
    expect(callOrder).toEqual(["clean", "optimize", "components", "index"])
  })

  it("should call unknown for unknown commands", () => {
    jest.spyOn(unknown, "unknown").mockImplementation()
    run([0, 0, "mip"])
    expect(unknown.unknown).toHaveBeenCalled()
  })
})
