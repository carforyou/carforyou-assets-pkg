import { validateConfiguration } from "../loadConfiguration"

jest.spyOn(process, "exit").mockImplementation()
jest.spyOn(console, "error").mockImplementation()

const validConfig = require("../../assets.config.json")

describe("loadConfiguration", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should not exit for a valid configuration", () => {
    validateConfiguration(validConfig)
    expect(process.exit).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it("should not exit for an empty configuration", () => {
    validateConfiguration(null)
    expect(process.exit).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
  })

  it("should validate the rootPath", () => {
    validateConfiguration({ ...validConfig, rootPath: true })
    expect(process.exit).toHaveBeenCalledWith(1)
    expect(console.error).toHaveBeenCalledWith("rootPath must be a string")
  })

  it("should validate debug", () => {
    validateConfiguration({ ...validConfig, debug: "mip" })
    expect(process.exit).toHaveBeenCalledWith(1)
    expect(console.error).toHaveBeenCalledWith("debug must be a boolean")
  })

  describe("indexFiles", () => {
    it("should validate if indexFiles is an array", () => {
      validateConfiguration({ ...validConfig, indexFiles: true })
      expect(process.exit).toHaveBeenCalledWith(1)
      expect(console.error).toHaveBeenCalledWith("indexFiles must be an array")
    })

    const invalidIndexFiles = [
      ["mip"],
      [{ directory: "path", extension: "tsx" }],
      [{ path: "path", extension: "jpg" }],
    ]

    invalidIndexFiles.forEach((indexFiles) => {
      it("should validate if indexFiles has the correct structure", () => {
        validateConfiguration({ ...validConfig, indexFiles })
        expect(process.exit).toHaveBeenCalledWith(1)
        expect(console.error).toHaveBeenCalledWith(
          expect.stringContaining("Wrong structure for indexFiles")
        )
      })
    })
  })

  describe("replaceColors", () => {
    it("should validate if replaceColors is an array", () => {
      validateConfiguration({ ...validConfig, replaceColors: true })
      expect(process.exit).toHaveBeenCalledWith(1)
      expect(console.error).toHaveBeenCalledWith(
        "replaceColors must be an array"
      )
    })

    it("should be an array containing hex colors", () => {
      validateConfiguration({ ...validConfig, replaceColors: ["FFF"] })
      expect(process.exit).toHaveBeenCalledWith(1)
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Wrong structure for replaceColors")
      )
    })
  })
})
