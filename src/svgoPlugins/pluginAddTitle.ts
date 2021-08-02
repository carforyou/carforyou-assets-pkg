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
  const titleId = params.title.replace(/\s/g, "").concat("Title")
  const titleElement = rootSvg.children.find((el) => el.name === "title")
  if (titleElement) {
    titleElement.attributes.id = titleId
  } else {
    rootSvg.children.unshift({
      type: "element",
      name: "title",
      attributes: { id: titleId },
      isElem: () => true,
      children: [{ type: "text", value: params.title }],
    })
  }
  rootSvg.attributes["aria-labelledby"] = titleId
  rootSvg.attributes["role"] = "img"
  return data
}
