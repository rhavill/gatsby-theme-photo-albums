export default (windowDimensions, pageContext) => {
  const {width, height} = windowDimensions
  const ratio = pageContext.width / pageContext.height
  if (pageContext.width < width && pageContext.height < height)
    return {maxWidth: width, maxHeight: height}
  const excessWidthFactor = (pageContext.width - width) / width
  const excessHeightFactor = (pageContext.height - height) / height
  return excessWidthFactor > excessHeightFactor
    ? {maxWidth: width, maxHeight: width / ratio}
    : {maxWidth: height * ratio, maxHeight: height}
}