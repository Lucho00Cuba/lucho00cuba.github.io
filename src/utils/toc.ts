/**
 * Get the next heading element of the same type
 * @param titleElements 
 * @returns 
 */
export const mapNextSameHeadingElement = (titleElements: HTMLHeadingElement[]) => {
  const result = []
  const length = titleElements.length
  for (let i = 0; i < length; i++) {
    const currentElement = titleElements[i]
    const currentTag = currentElement.tagName.toLowerCase()
    // Find the next heading of the same type
    let nextSameTagElement = null
    for (let j = i + 1; j < length; j++) {
      const nextElement = titleElements[j]
      const nextTag = nextElement.tagName.toLowerCase()
      if (nextTag <= currentTag) {
        nextSameTagElement = nextElement
        break
      }
    }
    // Add the result to the array
    result.push({
      el: currentElement,
      next: nextSameTagElement,
    })
  }

  // Handle the case where there is only one h1 element
  if (result.length == 1 && result[0].el.tagName.toLowerCase() == "h1" && !result[0].next) {
    result[0].next = result[result.length - 1].el
  }

  return result
}