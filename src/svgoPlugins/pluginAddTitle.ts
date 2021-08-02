import camelCase from "lodash.camelcase"

type SVG = {
  type: string
  name?: string
  attributes?: Record<string, string>
  value?: string
  children?: SVG[]
  isElem?: () => boolean
}

export const pluginAddTitle = (
  data: SVG,
  params: Record<string, string>
): SVG => {
  if (!(data.children && data.children.length)) {
    return data
  }
  const rootSvg = data.children[0]
  const titleElement = rootSvg.children.find((el) => el.name === "title")
  if (!titleElement) {
    rootSvg.children.unshift({
      type: "element",
      name: "title",
      attributes: {},
      isElem: () => true,
      children: [{ type: "text", value: params.title }],
    })
    rootSvg.attributes["aria-label"] = params.title
  }
  rootSvg.attributes["role"] = "img"
  return data
}
