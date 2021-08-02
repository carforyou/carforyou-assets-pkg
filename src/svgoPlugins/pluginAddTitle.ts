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
  const rootSvg = data.children
    ? data.children[0]
    : { children: [], attributes: {} }
  if (rootSvg && rootSvg.children.length) {
    const titleId = params.title.replace(/\s/g, "").concat("Title")
    const titleElement = rootSvg.children.find((el) => el.name === "title")
    if (titleElement) {
      titleElement.attributes.id = titleId
      addAccessibilityAttributesToRootSvg(rootSvg, titleId)
      return data
    } else {
      addAccessibilityAttributesToRootSvg(rootSvg, titleId)
      rootSvg.children.unshift({
        type: "element",
        name: "title",
        attributes: { id: titleId },
        isElem: () => true,
        children: [{ type: "text", value: params.title }],
      })
    }
  }
  return data
}

const addAccessibilityAttributesToRootSvg = (rootSvg, titleId) => {
  rootSvg.attributes["aria-labelledby"] = titleId
  rootSvg.attributes["role"] = "img"
}
