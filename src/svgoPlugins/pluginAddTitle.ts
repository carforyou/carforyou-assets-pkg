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
  const rootSvg = data.children ? data.children[0] : { children: [] }
  if (rootSvg && rootSvg.children.length) {
    const hasTitle = rootSvg.children.some((el) => el.name === "title")
    if (hasTitle) {
      return data
    } else {
      rootSvg.children.unshift({
        type: "element",
        name: "title",
        attributes: {},
        isElem: () => true,
        children: [{ type: "text", value: params.title }],
      })
    }
  }
  return data
}
